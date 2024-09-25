import { GET_HEADER_MENU, GET_FOOTER_MENU } from "@/app/queries/getMenus";
import { GET_POSTS } from "@/app/queries/getPosts";

const apiUrl: string = process.env.GRAPHQL_API_URL as string;

if (!apiUrl) {
    throw new Error('The GRAPHQL_API_URL environment variable is not defined');
  }

  
async function fetchGraphQL(query: string) {
    try {
        console.log(` here is the query ${query}`)
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
            query: query,
            }),
            next: {revalidate: 10},
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