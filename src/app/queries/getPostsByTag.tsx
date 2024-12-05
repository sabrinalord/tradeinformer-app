export const GET_POSTS_BY_TAG = `query GetPosts($first: Int, $after: String, $tagSlug: String) {
    posts(first: $first, after: $after, where: {tag: $tagSlug}) {
      nodes {
        id
        slug
        title
        date
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