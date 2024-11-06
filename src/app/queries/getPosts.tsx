
export const GET_POSTS = `query GetPosts($first: Int, $after: String) {
  posts(first: $first, after: $after) {
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
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
 `