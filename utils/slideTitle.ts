// Slidev passes the slide frontmatter to every layout as the `frontmatter`
// prop. Layouts declare it so it does not leak onto the root element as a
// `frontmatter="[object Object]"` attribute.
export type Frontmatter = Record<string, unknown>

// Page title for default / n-columns / n-rows: `heading`, else the slide's
// `title:` (the same value <Toc> lists).
export function slideTitle(heading: string | undefined, frontmatter: Frontmatter | undefined) {
  if (heading)
    return heading
  const title = frontmatter?.title
  return typeof title === 'string' ? title : ''
}
