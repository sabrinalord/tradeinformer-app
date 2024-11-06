import { GET_HEADER_MENU, GET_FOOTER_MENU } from "@/app/queries/getMenus";
import { GET_POSTS } from "@/app/queries/getPosts";
import {Post, PostsResponse} from "@/app/types";
const apiUrl: string = process.env.GRAPHQL_API_URL as string;

if (!apiUrl) {
    throw new Error('The GRAPHQL_API_URL environment variable is not defined');
  }


  interface GraphQLVariables {
    slug?: string;
    first?: number;
    after?: string | null;
  }

  
async function fetchGraphQL(query: string, variables?: GraphQLVariables) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                  query: query,
                  variables: variables,
            }),
          });
          
         await handleResponseErrors(response)
          const data = await response.json();
          return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw new Error(`Error occurred while fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`);
     }

}

async function handleResponseErrors(response: Response){
    if (!response.ok) {
        const errorDetails = await response.json(); 
        throw new Error(`Failed to fetch posts: ${response.status} ${errorDetails.message} `);
      } 

}

export async function fetchHeaderMenu() {
    return fetchGraphQL(GET_HEADER_MENU);
}


// export async function fetchPosts(
//                       first: number = 100,
//                       after: string | null = null, 
//                       slug: string | null) {
//   const variables = {
//     first,
//     after,
//     slug
//   };

//   return fetchGraphQL(GET_POSTS, variables);
// }



export async function fetchPosts(): Promise<PostsResponse> {
  let allPosts: Post[] = [];
  let hasNextPage = true;
  let afterCursor: string | null = null;
  let finalEndCursor: string | null = null;


  while (hasNextPage) {
    const variables = {
      slug: "",
      first:100,        
      after: afterCursor 
    };

    const data = await fetchGraphQL(GET_POSTS, variables) as PostsResponse;

    if (!data || !data.data || !data.data.posts) {
      throw new Error("Error fetching posts");
    }

    const newPosts = data.data.posts.nodes;
    allPosts = [...allPosts, ...newPosts];

    afterCursor = data.data.posts.pageInfo.endCursor;
    hasNextPage = data.data.posts.pageInfo.hasNextPage;

    finalEndCursor = afterCursor;

  }

  return {
    data: {
      posts: {
        nodes: allPosts,
        pageInfo: {
          endCursor: finalEndCursor,
          hasNextPage: false, // We've fetched all pages, so set hasNextPage to false
        },
      },
    },
  };
}








export async function fetchPostBySlug(slug: string) { 
    const query = `query GetPostBySlug($slug: String!) {
        postBy(slug: $slug) {
          title
          content
          date
          categories {
            edges {
              node {
                name
                slug
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }`
      
    const variables = { slug };
    return fetchGraphQL(query, variables);
}


export async function fetchFooterMenu() {
  return fetchGraphQL(GET_FOOTER_MENU);
}

