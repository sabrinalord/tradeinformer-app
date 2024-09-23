'use client';
import { gql, useQuery} from "@apollo/client";
import React from 'react';


interface PostsData {
    posts: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          content: string;
          date: string;
          slug: string;
          excerpt: string;
          featuredImage: {
            node: {
              sourceUrl: string;
              altText: string;
              mediaDetails: {
                sizes: Array<{
                  sourceUrl: string;
                  name: string;
                }>;
              };
            };
          };
       
        };
      }>;
    };
  }

const GET_POSTS = gql`
   query GETPOSTS($categoryName: String!) {
  posts(where: {categoryName: $categoryName}) {
    edges {
      node {
            id
            title
            content
            date
            slug
            featuredImage {
            node {
                sourceUrl
                altText
                mediaDetails {
                sizes {
                    sourceUrl
                    name
                }
                }
            }
            }
            excerpt
      }
    }
  }
}
`;


interface PostsProps {
  category: string;
}

export default function Posts({category}: PostsProps) {
    const { loading, error, data } = useQuery<PostsData>(GET_POSTS, {
      variables: { categoryName: category}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        
            <ul>
        {data?.posts.edges.map(({ node }) => (
          <li key={node.id}>
            <div>
              <h2>{node.title}</h2>
              <p>{node.date}</p>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              {node.featuredImage && (
                <img
                  loading="lazy"
                  src={node.featuredImage.node.sourceUrl}
                  alt={node.featuredImage.node.altText || 'Featured Image'}
                  width="300"
                  height="auto" 
                />
              )}
            </div>
          </li>
        ))}
      </ul>
       
    )
}