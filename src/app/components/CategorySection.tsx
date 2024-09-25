import React from 'react';
import { GET_POSTS } from '../queries/getPosts';
import { Post } from '../types'



interface CategorySectionProps {
  numberOfPosts: number;
  filteredPosts: Post[];
}



const CategorySection: React.FC<CategorySectionProps> =  ({filteredPosts, numberOfPosts}) => {

  const categoryName = filteredPosts[0].categories.nodes[0].name;

 const displayedPosts =  filteredPosts.slice(0, numberOfPosts);
  
    return (
      <ul>
        <h1>{categoryName}</h1>
        {displayedPosts.map((post) => (

            <li key={post.id}>
            <div>
              <h2>{post.title}</h2>
              <p>{post.date}</p>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                {post.featuredImage && (
                  <img
                    loading="lazy"
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || 'Featured Image'}
                    width="300"
                    height="auto" 
                  />
                )}
            </div>
          </li>
          ) )
        } 

      </ul>

    )
    
}


export default CategorySection;

