import { GET_CATEGORIES } from "@/app/queries/getCategories";
import { GET_HEADER_MENU, GET_FOOTER_MENU } from "@/app/queries/getMenus";
import { GET_PAGE_BY_SLUG } from "@/app/queries/getPageBySlug";
import { GET_POST_BY_SLUG } from "@/app/queries/getPostBySlug";
import { GET_POSTS } from "@/app/queries/getPosts";
import { GET_POSTS_BY_CATEGORY } from "@/app/queries/getPostsByCategory";
import { GET_POSTS_BY_TAG } from "@/app/queries/getPostsByTag";
import { GET_TAGS } from "@/app/queries/getTags";
import {CategoriesResponse, Post, PostsResponse, TagNode, TagsResponse} from "@/app/types";
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

  type FetchPostsVariables = {
    slug: string;
    first: number;
    after?: string | null;
    category?: string;
    tagSlug?: string;
  };

  type FetchTagsVariables = {
    slug: string;
    first: number;
    after?: string | null;
  };
  
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

export async function fetchPaginatedTags(
  query: string,
  variables: FetchTagsVariables
): Promise<TagsResponse> {

  let allTags: TagNode[] = [];
  let hasNextPage = true;
  let afterCursor: string | null = null;

  while (hasNextPage) {
    const paginatedVariables = { ...variables, after: afterCursor };

    try {
      const data = (await fetchGraphQL(query, paginatedVariables)) as TagsResponse;

      if (!data?.data?.tags) {
        console.error("GraphQL returned invalid data:", JSON.stringify(data, null, 2));
        throw new Error("Invalid GraphQL Response");
      }

      const newTags = data.data.tags.nodes;
      console.log(`Fetched ${newTags.length} tags`);

      allTags = [...allTags, ...newTags];
      afterCursor = data.data.tags.pageInfo.endCursor;
      hasNextPage = data.data.tags.pageInfo.hasNextPage;
    } catch (error) {
      console.error("Error fetching paginated tags:", error);
      throw error; 
    }
  }

  console.log(`Total tags fetched: ${allTags.length}`);

  return {
    data: {
      tags: {
        nodes: allTags,
        pageInfo: {
          endCursor: afterCursor,
          hasNextPage: false,
        },
      },
    },
  };
}



async function fetchPaginatedPosts(
  query: string,
  variables: FetchPostsVariables
): Promise<PostsResponse> {
  let allPosts: Post[] = [];
  let hasNextPage = true;
  let afterCursor: string | null = null;
  let finalEndCursor: string | null = null;

  while (hasNextPage) {
    const paginatedVariables = { ...variables, after: afterCursor}; 

    const data = await fetchGraphQL(query, paginatedVariables) as PostsResponse;

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

export async function fetchPosts(): Promise<PostsResponse> {
  return fetchPaginatedPosts(GET_POSTS, {
    slug: "",
    first: 40
  });
}

export async function fetchTags(): Promise<TagsResponse> {
  try {
    const tags = await fetchPaginatedTags(GET_TAGS, {
      slug: "",
      first: 100,
    });

    if (!tags?.data?.tags?.nodes?.length) {
      return { data: { tags: { nodes: [], pageInfo: { endCursor: null, hasNextPage: false } } } };
    }


    return tags;
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return { data: { tags: { nodes: [], pageInfo: { endCursor: null, hasNextPage: false } } } };
  }
}




export async function fetchPostsByCategory(
  category: string,
  afterCursor: string | null = null
): Promise<PostsResponse> {
  return fetchPaginatedPosts(GET_POSTS_BY_CATEGORY, {
    slug: "", 
    category,
    first: 30,
    after: afterCursor,
  });
}

export async function fetchPostsByTag(tagSlug: string): Promise<PostsResponse> {
  return fetchPaginatedPosts(GET_POSTS_BY_TAG, {
    slug: "", tagSlug,
    first: 30
  });
}

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

export async function fetchPageBySlug(slug: string) {
  const variables = { slug };
  try {
      const response = await fetchGraphQL(GET_PAGE_BY_SLUG, variables);
      if (!response.data.pageBy) {
          console.error(`Page not found for slug: ${slug}`);
          return null;
      }
      return response;
  } catch (error) {
      console.error(`Error fetching page by slug: ${slug}`, error);
      return null;
  }
}



export async function fetchFooterMenu() {
  return fetchGraphQL(GET_FOOTER_MENU);
}

