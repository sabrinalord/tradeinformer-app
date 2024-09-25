import React from 'react';
import { Post } from '../types'


interface CategorySectionProps {
  numberOfPosts: number;
  filteredPosts: Post[],
  flexDirection?: 'flex-col' | 'flex-row';
}


const CategorySection: React.FC<CategorySectionProps> =  ({
  filteredPosts, 
  numberOfPosts, 
 flexDirection = 'flex-col'}) => {

  const categoryName = filteredPosts[0].categories.nodes[0].name;

 const displayedPosts =  filteredPosts.slice(0, numberOfPosts);
  
    return (
        <div>
          {categoryName != "Featured" && (<h1>{categoryName}</h1>) }
          <div className={`flex ${flexDirection}`}>
          {displayedPosts.map((post) => (  
              <article key={post.id}>
                 {post.featuredImage && (
                      <img
                        loading="lazy"
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || 'Featured Image'}
                        width="300"
                        height="auto" 
                      />
                    )}
                <h2>{post.title}</h2>
                <p>{post.date}</p>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                   
              </article>
         ))};
         </div> 
        </div>


    )
    
}


export default CategorySection;

