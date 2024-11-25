export const GET_CATEGORIES = `
  query GetCategories {
    categories {
      nodes {
        slug
      }
    }
  }
`;