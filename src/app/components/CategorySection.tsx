import React from 'react';
import { Post } from '../types';
import Link from 'next/link'; 


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
  const categorySlug = filteredPosts[0].categories.nodes[0].slug;


 const displayedPosts =  filteredPosts.slice(0, numberOfPosts);
  
    return (
        <div>
          {categoryName != "Featured" && (<h1>{categoryName}</h1>) }
          <div className={`flex ${flexDirection}`}>
          {displayedPosts.map((post) => (  
              <article className="p-2" key={post.id}>
                <Link href={`/${categorySlug}/${post.slug}`}>
                 {post.featuredImage && (
                      <img
                        loading="lazy"
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || 'Featured Image'}
                        width= {flexDirection === 'flex-col' ? "100%" : "300"}
                        height="auto" 
                      />
                    )}
                <h2 className="font-bold">{post.title}</h2>
                <h2 className="font-bold">{post.slug}</h2>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                </Link>
              </article>
         ))}
         </div> 
        </div>


    )
    
}


export default CategorySection;

