 
  export interface PostsResponse {
    data: {
      posts: {
        nodes: Post[];
      };
    };
  }

  export interface SinglePostResponse {
    data: {
      postBy: Post
    };
  }


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

  export interface MenuResponse {
   data:{
    menuItems:{
        edges:  MenuItemEdge[];
    };
   }
  }

  export interface MenuItemEdge{
    node:MenuItem;
  }
  
export interface MenuItem {
                id: string;
              label: string;
              url: string;
              path: string;
              childItems?: {  
                edges: MenuItemEdge[];
              };  
        };
