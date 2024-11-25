import React from 'react';
import { Post } from '../types';
import Link from 'next/link'; 
import Image from 'next/image';


interface InlineArticleCardProps {
  numberOfPosts: number;
  filteredPosts: Post[];
  offset?: number;
  firstPostHasLargeImage?: boolean;
  showImage?: boolean;
  showExtract?: boolean;
  showCategoryTitle? : boolean;
  imageWidth  : number
}


const InlineArticleCard: React.FC<InlineArticleCardProps> =  ({
  filteredPosts, 
  numberOfPosts, 
  offset = 0,
  firstPostHasLargeImage = true,
  showImage = true,
  showExtract = true,
 showCategoryTitle = true,
  imageWidth
 }) => {

  if (!filteredPosts.length) return null;


  const validOffset = Math.min(offset, filteredPosts.length);
  const categoryName = filteredPosts[0].categories.nodes[0].name;
  const categorySlug = filteredPosts[0].categories.nodes[0].slug;
  const displayedPosts = filteredPosts.slice(validOffset, validOffset + numberOfPosts);
 const firstPost = displayedPosts[0];

 const renderCategoryHeader = () => (
  categoryName !== "Featured" &&  showCategoryTitle && (
    <span className="flex items-center mb-4">
      <h1 className="ml-2 font-bold uppercase text-lg">{categoryName}</h1>
      <div className="flex-1 border-t border-gray-300 ml-2"></div>
    </span>
  )
);


    return (
        <div className={``}>
          {renderCategoryHeader()}

          {/* ----- First Post ----- */}
            {firstPost && (
              <article className={`pb-4 m-2 sm:p-2 }`} key={firstPost.id}>
              <Link  href={`/${categorySlug}/${firstPost.slug}`}>
                <div className={`flex `}>
                    <div className={` ${showImage ? "block" : "hidden"} flex-shrink-0`}>
                      {firstPost.featuredImage &&  (
                        <div>
                        <Image className={`border object-cover  `}
                              style={{ width: `${imageWidth}vw`,
                              maxWidth: "300px" }}

                              src={firstPost.featuredImage.node.sourceUrl} 
                              width="600"
                              height="600" 
                              alt={firstPost.featuredImage.node.altText || 'Featured Image'} >
                           </Image> 

                        </div>
                     
                        )}
                    </div>
                    <div className="ml-2">
                      <h2 className={`font-bold  ${ categoryName === "Featured" ? "text-xl" : "text-lg/6"} `}>{firstPost.title}</h2>
                      <div className={` ${showExtract ? "block" : "hidden"} ${firstPostHasLargeImage ? "block" : ""} mt-2 ${ categoryName === "Featured" ? "text-base" : "text-sm/5"}`} dangerouslySetInnerHTML={{ __html: firstPost.excerpt }}></div> 
                    </div>
                </div>
                
                
              </Link>
            </article>
            )}

            {/* ----- Remaining Posts in the Loop ----- */}

          
            {displayedPosts.map((post, index) => (  
             index !== 0 && (
              <article className={`pb-4 m-2  sm:p-2`} key={post.id}>
                <Link  href={`/${categorySlug}/${post.slug}`}>
                  <div className={`flex `}>
                      <div className={`${showImage ? "block" : "hidden"} flex-shrink-0`}>
                        {post.featuredImage &&  (
                          <Image className={`border object-cover`}
                              style={{ width: `${imageWidth}vw`
                              , maxWidth: "300px" }}
                                src={post.featuredImage.node.sourceUrl} 
                                width="600"
                                height="600"  
                                alt={post.featuredImage.node.altText || 'Featured Image'} >
                             </Image> 
                          )}
                          
                      </div>
                      <div className="ml-2">
                      <h2 className={`font-bold ${ categoryName === "Featured" ? "text-xl" : "text-lg/6"} `}>{post.title}</h2>
                      <div className={` ${showExtract ? "block" : "hidden"} ${firstPostHasLargeImage ? "block" : ""} mt-2 ${ categoryName === "Featured" ? "text-base" : "text-sm/5"}`} dangerouslySetInnerHTML={{ __html: post.excerpt }}></div> 
                    </div>
                        
                  </div>

                </Link>
              </article>
            )))}
         

      </div>


    )
    
}


export default InlineArticleCard;

