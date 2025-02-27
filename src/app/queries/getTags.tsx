export const GET_TAGS = `
  query GetTags($first: Int, $after: String) {
      tags {
        nodes {
          slug
          name
        }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;