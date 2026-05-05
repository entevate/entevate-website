/**
 * Email signature rendering + export utilities.
 *
 * Signatures must render reliably across very different rendering engines:
 *
 *   - Apple Mail (macOS/iOS): permissive, renders ~all CSS, supports SVG.
 *   - Outlook desktop (Word renderer on Windows): hates margin/padding on
 *     non-table elements, ignores most modern CSS, no SVG. Tables only.
 *   - Gmail web: strips <style> blocks, requires inline styles, supports
 *     border-radius and modern CSS, supports SVG.
 *   - Outlook 365 web: closer to Gmail than to Outlook desktop.
 *
 * Approach: a single canonical HTML built with nested tables + inline
 * styles. Icons are inline SVG (works for everything except Outlook
 * desktop, which is acceptable since it'll just show empty space where
 * the icon would be — text labels still render). For maximum Outlook
 * desktop compatibility a future iteration can swap the SVGs for PNG
 * <img> tags hosted on entevate.com.
 *
 * No webfonts: rely on the system font stack so signatures don't go
 * Times-New-Roman in environments that block @font-face.
 */

const FONT_STACK = '"Helvetica Neue", Helvetica, Arial, sans-serif';

// ── tiny helpers ───────────────────────────────────────────────────────

function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function attr(s) {
  return esc(s);
}

function isHttpUrl(s) {
  return typeof s === 'string' && /^https?:\/\//i.test(s.trim());
}

function safeHref(url, fallback = '#') {
  return isHttpUrl(url) ? url : fallback;
}

// ── inline SVG icons ──────────────────────────────────────────────────
// Sized 16x16 by default, currentColor so muted_color cascades.

const SVG = {
  envelope: () =>
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18v12H3z" stroke="currentColor" stroke-width="1.6"/><path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="1.6"/></svg>`,
  phone: () =>
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A14 14 0 013 6a2 2 0 012-2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  mobile: () =>
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="18" r="0.9" fill="currentColor"/></svg>`,
  pin: () =>
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s7-7.6 7-13a7 7 0 10-14 0c0 5.4 7 13 7 13z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="1.6"/></svg>`,
  globe: () =>
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 12h17M12 3a14 14 0 010 18M12 3a14 14 0 000 18" stroke="currentColor" stroke-width="1.6"/></svg>`,
  // Filled black circle social glyphs (white inside marks).
  linkedin: () =>
    `<svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#000"/><path d="M7 9.5h2.4v8.5H7V9.5zm1.2-3.5a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8zM11.2 9.5h2.3v1.2c.4-.7 1.4-1.4 2.8-1.4 3 0 3.5 2 3.5 4.5V18h-2.4v-3.6c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2v3.7h-2.4V9.5z" fill="#fff"/></svg>`,
  instagram: () =>
    `<svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#000"/><rect x="6.6" y="6.6" width="10.8" height="10.8" rx="3" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="12" cy="12" r="2.5" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="15.4" cy="8.6" r="0.9" fill="#fff"/></svg>`,
  x: () =>
    `<svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#000"/><path d="M7 7l4.6 6.2L7.2 17h1.4l3.6-3 2.4 3h2.6l-4.7-6.4L17 7h-1.4l-3.3 2.7L10.2 7H7z" fill="#fff"/></svg>`,
  facebook: () =>
    `<svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#000"/><path d="M13 18v-5h1.7l.3-2H13v-1.3c0-.6.2-1 1-1H15V7h-1.6c-1.7 0-2.4 1-2.4 2.5V11H9v2h2v5h2z" fill="#fff"/></svg>`,
  youtube: () =>
    `<svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#000"/><path d="M17.4 9.2a1.7 1.7 0 00-1.2-1.2C15 7.7 12 7.7 12 7.7s-3 0-4.2.3a1.7 1.7 0 00-1.2 1.2C6.3 10.5 6.3 12 6.3 12s0 1.5.3 2.8a1.7 1.7 0 001.2 1.2c1.2.3 4.2.3 4.2.3s3 0 4.2-.3a1.7 1.7 0 001.2-1.2c.3-1.3.3-2.8.3-2.8s0-1.5-.3-2.8z" fill="#fff"/><path d="M10.8 14.2l3.5-2.2-3.5-2.2v4.4z" fill="#000"/></svg>`,
};

const SOCIAL_KEYS = ['linkedin', 'instagram', 'x', 'facebook', 'youtube'];

// ── canonical signature HTML ──────────────────────────────────────────

/**
 * @param {object} sig  matches the brand_signatures row shape:
 *   { full_name, title, company, email, phone, mobile, address_line1,
 *     address_line2, website, photo_url, logo_url, socials,
 *     show_disclaimer, disclaimer_text, accent_color, text_color,
 *     muted_color, divider_color, font_family }
 */
export function buildSignatureHtml(sig) {
  const {
    full_name = '',
    title = '',
    company = '',
    email = '',
    phone = '',
    mobile = '',
    address_line1 = '',
    address_line2 = '',
    website = '',
    photo_url = '',
    logo_url = '',
    socials = {},
    show_disclaimer = true,
    disclaimer_text = '',
    text_color = '#181818',
    muted_color = '#6b6b6b',
    divider_color = '#dddddd',
  } = sig || {};

  const font = FONT_STACK;

  // Contact rows: each is icon cell + value cell. Skip rows whose value is empty.
  const contactRows = [
    email && row(SVG.envelope(), `<a href="mailto:${attr(email)}" style="color:${esc(muted_color)};text-decoration:none;font-family:${font};font-size:14px;line-height:1.5;">${esc(email)}</a>`, muted_color),
    phone && row(SVG.phone(), `<a href="tel:${attr(phone.replace(/[^+0-9]/g, ''))}" style="color:${esc(muted_color)};text-decoration:none;font-family:${font};font-size:14px;line-height:1.5;">${esc(phone)}</a>`, muted_color),
    mobile && row(SVG.mobile(), `<a href="tel:${attr(mobile.replace(/[^+0-9]/g, ''))}" style="color:${esc(muted_color)};text-decoration:none;font-family:${font};font-size:14px;line-height:1.5;">${esc(mobile)}</a>`, muted_color),
    (address_line1 || address_line2) && row(
      SVG.pin(),
      [address_line1, address_line2]
        .filter(Boolean)
        .map((l) => `<span style="color:${esc(muted_color)};font-family:${font};font-size:14px;line-height:1.5;">${esc(l)}</span>`)
        .join('<br />'),
      muted_color
    ),
    website && row(
      SVG.globe(),
      `<a href="${attr(safeHref(website))}" style="color:${esc(muted_color)};text-decoration:none;font-family:${font};font-size:14px;line-height:1.5;">${esc(website.replace(/^https?:\/\//, 'https://'))}</a>`,
      muted_color
    ),
  ].filter(Boolean).join('');

  // Social icons — only include keys that have a non-empty URL.
  const socialCells = SOCIAL_KEYS
    .filter((k) => socials && typeof socials[k] === 'string' && socials[k].trim())
    .map((k) => `<td style="padding:0 6px 0 0;vertical-align:middle;"><a href="${attr(safeHref(socials[k]))}" style="text-decoration:none;display:inline-block;line-height:0;">${SVG[k]()}</a></td>`)
    .join('');

  const socialRow = socialCells
    ? `<tr><td colspan="2" style="padding-top:14px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${socialCells}</tr></table></td></tr>`
    : '';

  const hasMedia = Boolean(photo_url || logo_url);

  // Photo + logo block on the left (only rendered when at least one is set)
  const leftCol = hasMedia ? `
    <td valign="top" style="padding:0 24px 0 0;width:160px;">
      ${photo_url ? `<img src="${attr(photo_url)}" width="120" height="120" alt="${attr(full_name)}" style="display:block;width:120px;height:120px;border-radius:60px;object-fit:cover;border:0;outline:none;text-decoration:none;" />` : ''}
      ${logo_url ? `<div style="margin-top:14px;line-height:0;"><img src="${attr(logo_url)}" alt="ENTEVATE" style="display:block;height:24px;width:auto;border:0;outline:none;text-decoration:none;" /></div>` : ''}
    </td>
  ` : '';

  // Vertical divider as a 1px-wide cell with a left border
  const divider = hasMedia
    ? `<td style="border-left:1px solid ${esc(divider_color)};width:1px;padding:0;font-size:0;line-height:0;">&nbsp;</td>`
    : '';

  // Right column: identity stack + contact rows + socials
  const identityBlock = `
    <tr>
      <td colspan="2" style="padding:0 0 12px 0;">
        ${full_name ? `<div style="font-family:${font};font-size:18px;font-weight:700;color:${esc(text_color)};line-height:1.3;">${esc(full_name)}</div>` : ''}
        ${title ? `<div style="font-family:${font};font-size:14px;font-weight:400;color:${esc(muted_color)};line-height:1.5;margin-top:4px;">${esc(title)}</div>` : ''}
        ${company ? `<div style="font-family:${font};font-size:14px;font-weight:400;color:${esc(muted_color)};line-height:1.5;">${esc(company)}</div>` : ''}
      </td>
    </tr>
  `;

  const rightCol = `
    <td valign="top" style="padding:0 0 0 ${hasMedia ? '24px' : '0'};">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        ${identityBlock}
        ${contactRows}
        ${socialRow}
      </table>
    </td>
  `;

  const disclaimer = show_disclaimer && disclaimer_text
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;max-width:640px;">
        <tr>
          <td style="font-family:${font};font-size:12px;line-height:1.5;color:${esc(muted_color)};">
            ${esc(disclaimer_text)}
          </td>
        </tr>
      </table>
    `
    : '';

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
  <tr>
    ${leftCol}
    ${divider}
    ${rightCol}
  </tr>
</table>${disclaimer}`;
}

// One contact row: 18px icon column, value column. Used inside the right-col table.
function row(iconSvg, valueHtml, muted) {
  return `
    <tr>
      <td valign="top" style="padding:6px 10px 0 0;width:18px;color:${esc(muted)};line-height:0;">${iconSvg}</td>
      <td valign="top" style="padding:6px 0 0 0;">${valueHtml}</td>
    </tr>`;
}

// ── plain text fallback ────────────────────────────────────────────────

export function buildSignatureText(sig) {
  const lines = [];
  if (sig.full_name) lines.push(sig.full_name);
  if (sig.title) lines.push(sig.title);
  if (sig.company) lines.push(sig.company);
  if (sig.email) lines.push(sig.email);
  if (sig.phone) lines.push(sig.phone);
  if (sig.mobile) lines.push(sig.mobile);
  if (sig.address_line1) lines.push(sig.address_line1);
  if (sig.address_line2) lines.push(sig.address_line2);
  if (sig.website) lines.push(sig.website);
  return lines.join('\n');
}

// ── full-document wrapper for download ────────────────────────────────

export function wrapAsDocument(innerHtml, title = 'ENTEVATE Email Signature') {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:24px;background:#fff;">
${innerHtml}
</body>
</html>`;
}

// ── exports ────────────────────────────────────────────────────────────

/**
 * Copy rich-text HTML to the clipboard so when the user pastes into
 * Gmail / Outlook 365 web compose, the signature lands as formatted
 * markup (not raw HTML source).
 */
export async function copyRichHtmlToClipboard(html) {
  if (!navigator.clipboard || !window.ClipboardItem) {
    throw new Error('Your browser does not support copying rich-text. Use Download instead.');
  }
  const blobHtml = new Blob([html], { type: 'text/html' });
  const blobText = new Blob([html.replace(/<[^>]+>/g, '')], { type: 'text/plain' });
  const item = new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText });
  await navigator.clipboard.write([item]);
}

export async function copyPlainTextToClipboard(text) {
  if (!navigator.clipboard) {
    throw new Error('Your browser does not support clipboard access.');
  }
  await navigator.clipboard.writeText(text);
}

export function downloadFile(content, filename, mime = 'text/html') {
  const blob = new Blob([content], { type: mime });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/**
 * High-level export presets keyed by email client. Each returns a
 * description + an action the UI button calls.
 */
export const EXPORT_PRESETS = [
  {
    id: 'apple-mail',
    label: 'Download for Apple Mail',
    hint: 'Drag the .htm into Mail → Settings → Signatures.',
    toast: 'Downloaded — drag into Mail → Settings → Signatures, or replace the file in ~/Library/Mail/V*/MailData/Signatures/',
    action: 'download-htm',
  },
  {
    id: 'outlook-desktop',
    label: 'Download for Outlook (desktop)',
    hint: 'Save into your Signatures folder. Mac/Windows paths shown after download.',
    toast: 'Downloaded — save into Signatures. Win: %APPDATA%\\Microsoft\\Signatures · Mac: ~/Library/Group Containers/UBF8T346G9.Office/Outlook/Signatures',
    action: 'download-htm',
  },
  {
    id: 'gmail',
    label: 'Copy for Gmail (web)',
    hint: 'Paste into Gmail → Settings → General → Signature.',
    toast: 'Copied — paste into Gmail → Settings → General → Signature',
    action: 'copy-rich',
  },
  {
    id: 'outlook-365',
    label: 'Copy for Outlook 365 (web)',
    hint: 'Paste into Outlook Web → Settings → Mail → Signatures.',
    toast: 'Copied — paste into Outlook Web → Settings → Mail → Compose and reply → Signatures',
    action: 'copy-rich',
  },
  {
    id: 'raw-html',
    label: 'Copy raw HTML',
    hint: 'Paste into any HTML signature field.',
    toast: 'HTML source copied',
    action: 'copy-source',
  },
  {
    id: 'plain-text',
    label: 'Copy plain text',
    hint: 'For clients with no HTML support.',
    toast: 'Plain text copied',
    action: 'copy-text',
  },
];
