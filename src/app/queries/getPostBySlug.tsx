export const GET_POST_BY_SLUG = `query GetPostBySlug($slug: String!) {
  postBy(slug: $slug) {
    title
    content
     author {
      node {
        name
      }
    }
    date
    categories {
      edges {
        node {
          name
          slug
        }
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
  }
}`
