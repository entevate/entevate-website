import type { APIRoute } from 'astro'

/**
 * Exit Sanity draft preview mode.
 *
 * Called by Sanity Presentation tool (or a manual "Exit preview" affordance)
 * to clear the preview cookie. Redirects the user back to a safe path.
 */

export const prerender = false

const COOKIE_NAME = 'entevate_preview'

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const slug = url.searchParams.get('slug') || '/'
  const safeSlug = slug.startsWith('/') ? slug : `/${slug}`

  cookies.delete(COOKIE_NAME, { path: '/' })

  return redirect(safeSlug, 307)
}
