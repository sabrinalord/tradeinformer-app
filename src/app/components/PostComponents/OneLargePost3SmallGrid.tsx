import React from 'react';
import { Post } from '../../types';
import PostComponent from './PostComponent';
import CategoryHeader from '../CategoryHeader';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/dateFormatter';


interface OneLargefirstPost3SmallGridProps {
  numberOfPosts: number;
  filteredPosts: Post[];
  offset?: number;
  firstPostHasLargeImage?: boolean;
  showImage?: boolean;
  showExtract?: boolean;
  flexDirection?: 'flex-col' | 'flex-row';
  inlineTextOnDesktop?: boolean;
}

const OneLargefirstPost3SmallGrid: React.FC<OneLargefirstPost3SmallGridProps> = ({
  filteredPosts,
  numberOfPosts,
  offset = 0,
}) => {
  if (!filteredPosts.length) return null;

  const validOffset = Math.min(offset, filteredPosts.length);
  const categoryName = filteredPosts[0].categories.nodes[0].name;
  const categorySlug = filteredPosts[0].categories.nodes[0].slug;
  const displayedPosts = filteredPosts.slice(validOffset, validOffset + numberOfPosts);
  const firstPost = displayedPosts[0];

  const formattedDate = formatDate(firstPost.date);


  return (
    <div>
      <CategoryHeader categoryName={categoryName} />
      
 <div className={`flex flex-col lg:flex-row`}>

     <div className="max-w-[600px]">
     {/* Render First firstPost */}
     {firstPost && (
       <article className={`pb-4 m-2`} key={firstPost.id}>
       <Link href={`/${categorySlug}/${firstPost.slug}`}>
         <div className={`flex flex-col`}>
         
         <div className={`flex-shrink-0 `}>
   <Image
     className=""
     src={firstPost.featuredImage.node.sourceUrl}
     width="800"
     height="800"
     alt={firstPost.featuredImage.node.altText || "Featured Image"}
   />
 </div>
      
           <div className={` mt-2 lg:ml-0 lg:mt-2`}>
             <h2 className={`font-bold hover:text-linkBlue hover:underline  `}>
               {firstPost.title}
             </h2>
             <p className="text-sm">{formattedDate}</p>
             <div
             className={`mt-2`}
             dangerouslySetInnerHTML={{ __html: firstPost.excerpt }}
               /> 
           </div>
         </div>
 
     
       </Link>
     </article>
      )}
     </div>
    
      <div className="lg:ml-2 lg:mr-2">
        {/* Render Remaining firstPosts */}
        {displayedPosts.map((Post, index) => index !== 0 && (
          <PostComponent
            post={Post}
            isFirstPost={false}
            showExtract={false}
            categorySlug={categorySlug}
            key={firstPost.id}
          />
        ))}
      </div>
 </div>
    </div>
  );
};

export default OneLargefirstPost3SmallGrid;
