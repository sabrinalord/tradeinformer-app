


  export type PostsResponse = {
    data: {
      posts: {
        nodes: Post[];
        pageInfo: {
          endCursor: string | null;
          hasNextPage: boolean;
        };
      };
    };
  } | null;
  

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
    author: {
      node: {
        name : string;
      }
    };
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
        altText: string | undefined;
      }; 
    } ; 
    tags: {
      nodes: {
        name: string;
        slug: string;
        uri: string;
      }[];
    }
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
              slug: string;
              childItems?: {  
                edges: MenuItemEdge[];
              };  
        };

        export type WidgetType = 
        | "desktop_billboard_top"
        | "mobile_billboard_top"
        | "desktop_billboard_middle"
        | "mobile_billboard_middle"
        | "sidebar";
    
    export interface WidgetData {
        type: WidgetType;
        image_url: string;
        target_url: string;
        country?: string; 
    }
    
    export interface CategoriesResponse {
     data: {
      categories: {
        nodes: CategoryNode[];
      };
     }
    }
    
  export interface CategoryNode {
      slug: string;
      name: string;
    }


    export interface TagsResponse {
      data: {
       tags: {
         nodes: TagNode[];
       };
      }
     }

     export interface TagNode {
      slug: string;
      name: string;
    }
