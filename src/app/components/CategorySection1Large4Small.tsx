import React from 'react';
import { Post } from '../types';
import Link from 'next/link'; 
import Image from 'next/image';


interface CategorySectionProps {
  numberOfPosts: number;
  filteredPosts: Post[],
  flexDirection?: 'flex-col' | 'flex-row';
}


export const CategorySection1Larege4Small: React.FC<CategorySectionProps> =  ({
  filteredPosts, 
  numberOfPosts, 
 flexDirection = 'flex-col'}) => {

  const categoryName = filteredPosts[0].categories.nodes[0].name;
  const categorySlug = filteredPosts[0].categories.nodes[0].slug;
 const displayedPosts =  filteredPosts.slice(0, numberOfPosts);
 const firstPost = displayedPosts[0];

  
    return (
        <div>
        
            <span className="flex items-center mb-4">
              <h1 className="ml-2 font-bold uppercase text-lg">{categoryName}</h1>
              <div className="flex-1 border-t border-gray-300 ml-2"></div>
            </span>
      
          <div className="flex"> 

            {firstPost && (
                   <div >
                   <article className={`pb-4 m-2 border-b  sm:p-2 ${categoryName === "Featured" ? "mb-12" : ""}`} key={firstPost.id}>
                   <Link  href={`/${categorySlug}/${firstPost.slug}`}>
                  
                     <div className={` ${categoryName === "Featured" ? "grid-cols-1" : "grid-cols-3"} grid sm:grid-cols-1 gap-2 sm:gap-4`}>
                         <div className="col-span-1">
                           {firstPost.featuredImage && (
                             <Image className="border min-w-50 max-w-50" src={firstPost.featuredImage.node.sourceUrl} width={`${categoryName === "Featured" ? "800" : "400"}`} height="400" alt={firstPost.featuredImage.node.altText || 'Featured Image'} ></Image> 
                             )}
                         </div>
                         <div className="col-span-2">
                           <h2 className={`font-bold ${ categoryName === "Featured" ? "text-xl" : "text-lg/6"}`}>{firstPost.title}</h2>
                         </div>
                     </div>
   
                     <div className={`mt-2 ${ categoryName === "Featured" ? "text-base" : "text-sm/5"}`} dangerouslySetInnerHTML={{ __html: firstPost.excerpt }}>
                     </div>
                   </Link>
                 </article>
                 </div>
            )}


         <div className="flex flex-col">
          {displayedPosts.map((post, index) => (  
               index !=  0 && (
                <article className={`pb-4 m-2 border-b  sm:p-2 ${categoryName === "Featured" ? "mb-12" : ""}`} key={post.id}>
                <Link  href={`/${categorySlug}/${post.slug}`}> 
                  <div className={` ${categoryName === "Featured" ? "grid-cols-1" : "grid-cols-3"} grid sm:grid-cols-1 gap-2 sm:gap-4`}>
                      <div className="col-span-1">
                        {post.featuredImage && (
                          <Image className="border min-w-50 max-w-50" src={post.featuredImage.node.sourceUrl} width={`${categoryName === "Featured" ? "800" : "400"}`} height="400" alt={post.featuredImage.node.altText || 'Featured Image'} ></Image> 
                          )}
                      </div>
                      <div className="col-span-2">
                        <h2 className="font-bold text-lg/6">{post.title}</h2>
                      </div>
                  </div>
                </Link>
              </article>
               )
    
            )          
            
         )}
         </div>
         </div> 
        </div>


    )
    
}



