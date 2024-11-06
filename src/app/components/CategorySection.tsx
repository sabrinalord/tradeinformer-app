import React from 'react';
import { Post } from '../types';
import Link from 'next/link'; 
import Image from 'next/image';


interface CategorySectionProps {
  numberOfPosts: number;
  filteredPosts: Post[];
  offset?: number;
  firstPostHasLargeImage?: boolean;
  showImage?: boolean;
  showExtract?: boolean;
  flexDirection?: 'flex-col' | 'flex-row'; 
  gridLayout?: boolean;

}


const CategorySection: React.FC<CategorySectionProps> =  ({
  filteredPosts, 
  numberOfPosts, 
  offset = 0,
  firstPostHasLargeImage = true,
  showImage = true,
  showExtract = true,
 flexDirection = 'flex-col',
 gridLayout = false }) => {

  if (!filteredPosts.length) return null;


  const validOffset = Math.min(offset, filteredPosts.length);
  const categoryName = filteredPosts[0].categories.nodes[0].name;
  const categorySlug = filteredPosts[0].categories.nodes[0].slug;
  const displayedPosts = filteredPosts.slice(validOffset, validOffset + numberOfPosts);
 const firstPost = displayedPosts[0];

 const renderCategoryHeader = () => (
  categoryName !== "Featured" && (
    <span className="flex items-center mb-4">
      <h1 className="ml-2 font-bold uppercase text-lg">{categoryName}</h1>
      <div className="flex-1 border-t border-gray-300 ml-2"></div>
    </span>
  )
);


    return (
        <div>
          {renderCategoryHeader()}

          {/* ----- First Post ----- */}
         
          <div className={`flex flex-col ${gridLayout ? "lg:flex-row" : `lg:${flexDirection}`}`}>
            {firstPost && (
              <article className={`pb-4 m-2 ${gridLayout ? "lg:w-[30vw]" : ""} ${flexDirection == "flex-col" ? "border-b" : "" }  sm:p-2 }`} key={firstPost.id}>
              <Link  href={`/${categorySlug}/${firstPost.slug}`}>
                <div className={`${firstPostHasLargeImage ? "" : "flex flex-row"}`}>
                    <div className={` ${showImage ? "block" : "hidden"}`}>
                      {firstPost.featuredImage &&  (
                        <div>
                        <Image className={`border object-cover ${firstPostHasLargeImage ? "" : "w-[35vw]"}  `}
                              src={firstPost.featuredImage.node.sourceUrl} 
                              width="800"
                              height="800" 
                              alt={firstPost.featuredImage.node.altText || 'Featured Image'} >
                           </Image> 

                        </div>
                     
                        )}
                    </div>
                    <div className="">
                      <h2 className={`font-bold mt-2 ${ categoryName === "Featured" ? "text-xl" : "text-lg/6"} ${firstPostHasLargeImage ? "" : "ml-2"}`}>{firstPost.title}</h2>
                    </div>
                </div>

                <div className={` ${showExtract ? "block" : "hidden"} ${firstPostHasLargeImage ? "block" : "hidden"} mt-2 ${ categoryName === "Featured" ? "text-base" : "text-sm/5"}`} dangerouslySetInnerHTML={{ __html: firstPost.excerpt }}>
                </div>
              </Link>
            </article>
            )}

         {/* ----- Remaining Posts in the Loop ----- */}

         <div className={`${gridLayout ? "flex flex-col" : `lg:flex lg:${flexDirection}`}`}>

          {displayedPosts.map((post, index) => (  
             index !== 0 && (
              <article className={`pb-4 m-2 ${flexDirection == "flex-col" ? "border-b" : "" }  sm:p-2`} key={post.id}>
                <Link  href={`/${categorySlug}/${post.slug}`}>
                  <div className={`flex  ${gridLayout ? "flex-col lg:flex-row" : "lg:flex-col"}  `}>
                      <div className={`${showImage ? "block" : "hidden"} flex-shrink-0`}>
                        {post.featuredImage &&  (
                          <Image className={`border object-cover  ${gridLayout ? "lg:w-[10vw]" : "w-[35vw]"}`}
                                src={post.featuredImage.node.sourceUrl} 
                                width="800"
                                height="800"  
                                alt={post.featuredImage.node.altText || 'Featured Image'} >
                             </Image> 
                          )}
                          
                      </div>
                        <h2 className={`font-bold text-lg/6 ${showImage ? "ml-2" : "" } ${gridLayout ? "" : "lg:ml-0"} ${showImage ? "mt-2" : ""}`}>{post.title}</h2>
                  </div>

                  <div className={` hidden ${showExtract ? "sm:block" : "hidden"}  mt-2 text-sm/5`} dangerouslySetInnerHTML={{ __html: post.excerpt }}>
                  </div>
                </Link>
              </article>
         )))}
         </div>
        </div> 
      </div>


    )
    
}


export default CategorySection;

