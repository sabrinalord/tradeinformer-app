

export const GET_POSTS_BY_CATEGORY = `query GetPostsByCategory($first: Int, $after: String, $category: String) {
    posts(first: $first, after: $after, where: {categoryName: $category}) {
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
  }`;
  