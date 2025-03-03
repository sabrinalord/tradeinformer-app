

export const GET_POSTS_BY_CATEGORY = `
    query GetCategoryPosts($slug: String!, $first: Int!, $after: String) {
      posts(
        where: { categoryName: $slug }
        first: $first
        after: $after
      ) {
        nodes {
          title
          slug
          date
          excerpt
          categories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `;
  