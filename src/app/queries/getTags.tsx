export const GET_TAGS = `
  query GetTags {
    tags {
      nodes {
        slug
        name
      }
    }
  }
`;