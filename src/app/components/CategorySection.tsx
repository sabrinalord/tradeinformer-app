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
          {categoryName != "Featured" && (
            <span className="flex items-center mb-4">
              <h1 className="ml-2 font-bold uppercase text-lg">{categoryName}</h1>
              <div className="flex-1 border-t border-gray-300 ml-2"></div>
            </span>
            ) }
          <div className={`flex ${flexDirection}`}>
          {displayedPosts.map((post) => (  
              <article className="p-2 mb-8" key={post.id}>
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

                
                <h2 className={`font-bold mt-2 mb-2 ${ categoryName === "Featured" ? "text-xl" : "text-lg"}`}>{post.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                </Link>
              </article>
         ))}
         </div> 
        </div>


    )
    
}


export default CategorySection;

