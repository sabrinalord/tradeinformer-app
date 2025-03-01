export const GET_POST_BY_SLUG = `query GetPostBySlug($slug: String!) {
  postBy(slug: $slug) {
    title
    content
    excerpt
     author {
      node {
        name
      }
    }
    date
     categories {
          nodes {
            name
            slug
          }
     }
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
         tags {
        nodes {
          name
          slug
          uri
        }
      }
  }
}`
