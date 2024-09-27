
export const GET_POSTS = `query GetPosts {
  posts(first: 100) {
      nodes {
        id
        slug
        title
        date
        content
        categories {
          nodes {
            name
            slug
          }
        }
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
 `