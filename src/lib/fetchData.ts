import { GET_HEADER_MENU, GET_FOOTER_MENU } from "@/app/queries/getMenus";
import { GET_POST_BY_SLUG } from "@/app/queries/getPostBySlug";
import { GET_POSTS } from "@/app/queries/getPosts";

const apiUrl: string = process.env.GRAPHQL_API_URL as string;

if (!apiUrl) {
    throw new Error('The GRAPHQL_API_URL environment variable is not defined');
  }

  
async function fetchGraphQL(query: string, variables?: {slug: string}) {
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


export async function fetchPosts() {
  return fetchGraphQL(GET_POSTS);
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

