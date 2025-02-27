export const GET_TAGS = `
  query GetTags($first: Int, $after: String) {
    tags(first: $first, after: $after) {
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
