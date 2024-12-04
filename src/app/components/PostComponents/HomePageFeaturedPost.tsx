import React from 'react';
import Link from 'next/link';
import { Post } from '../../types';
import Image from 'next/image';
import { formatDate } from '@/lib/dateFormatter';




interface HomePageFeaturedPostProps {
    post: Post;
    categorySlug: string;
}


const HomePageFeaturedPost:React.FC<HomePageFeaturedPostProps> = ({
    post, categorySlug}) => {

    const formattedDate = formatDate(post.date);


     return (
        <article className={`pb-4 m-2`} key={post.id}>
          <Link href={`/${categorySlug}/${post.slug}`}>
            <div className={`flex flex-col`}>
            
            <div className={`flex-shrink-0 `}>
      <Image
        className=""
        src={post.featuredImage.node.sourceUrl}
        width="800"
        height="800"
        alt={post.featuredImage.node.altText || "Featured Image"}
      />
    </div>
         
              <div className={` ml-2 lg:ml-0 mt-2`}>
                <h2 className={`font-bold text-xl `}>
                  {post.title}
                </h2>
                <p className="text-sm">{formattedDate}</p>
                <div
                className={`mt-2`}
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  /> 
              </div>
            </div>
    
        
          </Link>
        </article>
      );
}

export default HomePageFeaturedPost;