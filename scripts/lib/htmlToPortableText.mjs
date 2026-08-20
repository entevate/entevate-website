import * as cheerio from 'cheerio'
import crypto from 'crypto'

/**
 * Minimal HTML → Portable Text converter.
 *
 * Handles the subset of HTML used across ENTEVATE insight posts:
 *   - Block: p, h2, h3, h4, ul, ol, blockquote, pull-quote div
 *   - Inline (marks): strong, em, a, code
 *
 * Anything unrecognized is dropped with a warning.
 * Non-prose custom sections (service-cards, takeaways-grid) are converted
 * to Portable Text approximations (heading + list).
 */

function key() {
  return crypto.randomBytes(6).toString('hex')
}

function textBlock(style, children, listItem, level) {
  const block = {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children,
  }
  if (listItem) {
    block.listItem = listItem
    block.level = level || 1
  }
  return block
}

function span(text, marks = []) {
  return {
    _type: 'span',
    _key: key(),
    text,
    marks,
  }
}

function extractInline($, node, activeMarks = [], markDefs = []) {
  const children = []
  $(node)
    .contents()
    .each((_, child) => {
      if (child.type === 'text') {
        const text = child.data.replace(/\s+/g, ' ')
        if (text.trim() || children.length > 0) {
          children.push(span(text, [...activeMarks]))
        }
      } else if (child.type === 'tag') {
        const tag = child.tagName?.toLowerCase()
        if (tag === 'strong' || tag === 'b') {
          const nested = extractInline($, child, [...activeMarks, 'strong'], markDefs)
          children.push(...nested.children)
          markDefs.push(...nested.markDefs)
        } else if (tag === 'em' || tag === 'i') {
          const nested = extractInline($, child, [...activeMarks, 'em'], markDefs)
          children.push(...nested.children)
          markDefs.push(...nested.markDefs)
        } else if (tag === 'code') {
          const nested = extractInline($, child, [...activeMarks, 'code'], markDefs)
          children.push(...nested.children)
          markDefs.push(...nested.markDefs)
        } else if (tag === 'a') {
          const linkKey = key()
          markDefs.push({
            _type: 'link',
            _key: linkKey,
            href: $(child).attr('href') || '#',
          })
          const nested = extractInline($, child, [...activeMarks, linkKey], markDefs)
          children.push(...nested.children)
        } else if (tag === 'br') {
          children.push(span('\n', [...activeMarks]))
        } else if (tag === 'span') {
          const nested = extractInline($, child, activeMarks, markDefs)
          children.push(...nested.children)
        } else {
          // Unknown inline tag; fall through to text
          const inner = $(child).text().replace(/\s+/g, ' ')
          if (inner.trim()) children.push(span(inner, [...activeMarks]))
        }
      }
    })
  // Collapse consecutive identical-marks spans
  const collapsed = []
  for (const s of children) {
    const prev = collapsed[collapsed.length - 1]
    if (prev && prev._type === 'span' && JSON.stringify(prev.marks) === JSON.stringify(s.marks)) {
      prev.text += s.text
    } else {
      collapsed.push(s)
    }
  }
  return { children: collapsed, markDefs }
}

function inlineToBlock($, el, style = 'normal', listItem = null, level = 1) {
  const { children, markDefs } = extractInline($, el)
  if (children.length === 0) return null
  const block = textBlock(style, children, listItem, level)
  block.markDefs = markDefs
  return block
}

/**
 * Convert an HTML fragment into a Portable Text array.
 *
 * @param {string} html
 * @returns {any[]} Portable Text blocks
 */
export function htmlToPortableText(html) {
  const $ = cheerio.load(html, { xmlMode: false }, false)
  const blocks = []

  // Walk top-level children of the fragment.
  const root = $.root()
  const topLevel = root.children().toArray()
  if (topLevel.length === 0) {
    // Try body or root text
    root.contents().each((_, c) => topLevel.push(c))
  }

  for (const el of topLevel) {
    processElement($, el, blocks, { level: 1 })
  }
  return blocks
}

function processElement($, el, blocks, ctx) {
  if (el.type === 'text') {
    const text = el.data.trim()
    if (text) {
      blocks.push(textBlock('normal', [span(text)]))
    }
    return
  }
  if (el.type !== 'tag') return
  const tag = el.tagName?.toLowerCase()
  const $el = $(el)
  const cls = ($el.attr('class') || '').split(/\s+/)

  // Pull quote special case: <div class="pull-quote"><p>...</p></div>
  if (tag === 'div' && cls.includes('pull-quote')) {
    const inner = $el.find('p').first()
    const text = inner.text().replace(/^\s*["“]|["”]\s*$/g, '').trim()
    if (text) {
      blocks.push({
        _type: 'quoteBlock',
        _key: key(),
        quote: text,
      })
    }
    return
  }

  // Service card grids and similar: recurse into children, treating each card
  // as h4 + p pair.
  if (
    tag === 'div' &&
    (cls.includes('service-cards') ||
      cls.includes('takeaways-grid') ||
      cls.includes('feature-grid'))
  ) {
    $el.children().each((_, card) => {
      const $card = $(card)
      const h = $card.find('h3, h4').first()
      if (h.length) {
        const b = inlineToBlock($, h.get(0), 'h3')
        if (b) blocks.push(b)
      }
      $card.find('p').each((_, p) => {
        const b = inlineToBlock($, p, 'normal')
        if (b) blocks.push(b)
      })
    })
    return
  }

  switch (tag) {
    case 'p': {
      const b = inlineToBlock($, el, 'normal')
      if (b) blocks.push(b)
      break
    }
    case 'h2': {
      const b = inlineToBlock($, el, 'h2')
      if (b) blocks.push(b)
      break
    }
    case 'h3': {
      const b = inlineToBlock($, el, 'h3')
      if (b) blocks.push(b)
      break
    }
    case 'h4': {
      const b = inlineToBlock($, el, 'h4')
      if (b) blocks.push(b)
      break
    }
    case 'blockquote': {
      const b = inlineToBlock($, el, 'blockquote')
      if (b) blocks.push(b)
      break
    }
    case 'ul':
    case 'ol': {
      const type = tag === 'ul' ? 'bullet' : 'number'
      $el.children('li').each((_, li) => {
        const b = inlineToBlock($, li, 'normal', type, ctx.level)
        if (b) blocks.push(b)
      })
      break
    }
    case 'section':
    case 'div':
    case 'article':
    case 'aside':
    case 'main': {
      // Recurse into containers.
      $el.children().each((_, child) => {
        processElement($, child, blocks, { level: ctx.level })
      })
      break
    }
    default:
      // Skip <style>, <script>, <svg>, <img>, etc. at this level.
      break
  }
}
