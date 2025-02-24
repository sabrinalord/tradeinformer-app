
export const GET_POSTS = `query GetPosts($first: Int, $after: String) {
  posts(first: $first, after: $after) {
    nodes {
      id
      slug
      title
      date
      modified
      content
      author {
        node {
          name
        }
      }
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
      tags {
        nodes {
          name
          slug
          uri
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
 `