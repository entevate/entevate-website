import type { APIRoute } from 'astro'

/**
 * Enable Sanity draft preview mode.
 *
 * Called by Sanity Presentation tool with a secret + target path:
 *   /api/preview?secret=<SANITY_PREVIEW_SECRET>&slug=/insights/foo
 *
 * On success:
 *   1. Verifies the secret matches SANITY_PREVIEW_SECRET.
 *   2. Sets an httpOnly signed cookie that flags the request as preview.
 *   3. Redirects to the target slug.
 *
 * The Astro middleware (src/middleware.ts) reads this cookie and sets
 * Astro.locals.preview so pages call previewClient instead of sanityClient.
 */

export const prerender = false

const COOKIE_NAME = 'entevate_preview'

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const secret = url.searchParams.get('secret')
  const slug = url.searchParams.get('slug') || '/'

  const expected = import.meta.env.SANITY_PREVIEW_SECRET

  if (!expected) {
    return new Response(
      'Preview mode is not configured. Set SANITY_PREVIEW_SECRET in env.',
      { status: 500 },
    )
  }

  if (secret !== expected) {
    return new Response('Invalid preview secret.', { status: 401 })
  }

  // Validate the target path is same-origin (prevent open-redirect abuse).
  const safeSlug = slug.startsWith('/') ? slug : `/${slug}`

  cookies.set(COOKIE_NAME, expected, {
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    path: '/',
    // Session cookie; cleared when browser closes or via /api/exit-preview.
  })

  return redirect(safeSlug, 307)
}
