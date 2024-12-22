export const GET_PAGE_BY_SLUG = `query GetPageBySlug($slug : String!) {
    pageBy(uri: $slug) {
    id
    title
    content
    slug

  }
  }
    `