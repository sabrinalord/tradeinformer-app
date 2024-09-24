export interface Post {
    id: string;
    slug: string;
    title: string;
    content: string;
    date: string; 
    categories: {
      nodes: {
        name: string;
        slug: string;
      }[];
    };
    excerpt: string;
    featuredImage: {
      node: {
        sourceUrl: string;
        altText: string | null;
      }; 
    } ; 
  }
  
  export interface PostsResponse {
    data: {
      posts: {
        nodes: Post[];
      };
    };
  }