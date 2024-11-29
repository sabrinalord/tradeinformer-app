import { GET_CATEGORIES } from "@/app/queries/getCategories";
import { GET_HEADER_MENU, GET_FOOTER_MENU } from "@/app/queries/getMenus";
import { GET_POST_BY_SLUG } from "@/app/queries/getPostBySlug";
import { GET_POSTS } from "@/app/queries/getPosts";
import { GET_POSTS_BY_CATEGORY } from "@/app/queries/getPostsByCategory";
import {CategoriesResponse, Post, PostsResponse} from "@/app/types";
const apiUrl: string = process.env.GRAPHQL_API_URL as string;

if (!apiUrl) {
    throw new Error('The GRAPHQL_API_URL environment variable is not defined');
  }


  interface GraphQLVariables {
    slug?: string;
    first?: number;
    after?: string | null;
    [key: string]: string | number | null | undefined;
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
        throw new Error(`Failed to fetch posts: ${response.statusText} ${errorDetails.message} `);
      } 

}

export async function fetchHeaderMenu() {
    return fetchGraphQL(GET_HEADER_MENU);
}



export async function fetchCategories(): Promise<CategoriesResponse> {
  const data = await fetchGraphQL(GET_CATEGORIES);
  return data; 
}

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

export async function fetchPostsByCategory(category:string): Promise<PostsResponse> {
  let allPosts: Post[] = [];
  let hasNextPage = true;
  let afterCursor: string | null = null;
  let finalEndCursor: string | null = null;


  while (hasNextPage) {
    const variables = {
      slug: "",
      first:10,        
      after: afterCursor,
      category: category 
    };

    const data = await fetchGraphQL(GET_POSTS_BY_CATEGORY, variables) as PostsResponse;

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
          hasNextPage: false,
        },
      },
    },
  };
}

// export async function fetchPostBySlug(slug: string) { 
//     const variables = { slug };
//     return fetchGraphQL(GET_POST_BY_SLUG, variables);
// }

export async function fetchPostBySlug(slug: string) {
  const variables = { slug };
  try {
      const response = await fetchGraphQL(GET_POST_BY_SLUG, variables);
      if (!response?.data?.postBy) {
          console.error(`Post not found for slug: ${slug}`);
          return null;
      }
      return response;
  } catch (error) {
      console.error(`Error fetching post by slug: ${slug}`, error);
      return null;
  }
}



export async function fetchFooterMenu() {
  return fetchGraphQL(GET_FOOTER_MENU);
}

