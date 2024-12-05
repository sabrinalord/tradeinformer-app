import React from 'react';
import { Post } from '../../types';
import Link from 'next/link';
import ImageComponent from './ImageComponent';
import { formatDate } from '@/lib/dateFormatter';

interface PostProps {
  post: Post;
  showImage?: boolean;
  showExtract?: boolean;
  inlineTextOnDesktop?: boolean;
  firstPostHasLargeImage?: boolean;
  isFirstPost?: boolean;
  categorySlug: string;
}

const PostComponent: React.FC<PostProps> = ({
  post,
  showImage = true,
  showExtract = true,
  inlineTextOnDesktop = false,
  firstPostHasLargeImage = true,
  isFirstPost,
  categorySlug,
}) => {
  const formattedDate = formatDate(post.date);

  return (
    <article className={`pb-4 p-1 m-2 ${inlineTextOnDesktop ? '' : 'border-b lg:max-w-[270px]'} `} key={post.id}>
      <Link href={`/${categorySlug}/${post.slug}`}>
        <div className={`${inlineTextOnDesktop ? "flex flex-row" : "flex flex-row lg:flex-col"} ${firstPostHasLargeImage && isFirstPost ? "flex flex-col" : ""}`}>
          {showImage && post.featuredImage && (
            <ImageComponent
              src={post.featuredImage.node.sourceUrl}
              altText={post.featuredImage.node.altText}
              inlineTextOnDesktop={inlineTextOnDesktop}
              isFirstPost={isFirstPost || false }
              firstPostHasLargeImage={firstPostHasLargeImage}
            />
          )}
          <div className={` ml-2 ${isFirstPost && firstPostHasLargeImage ? "mt-2" : ""} lg:ml-0 ${inlineTextOnDesktop ? "lg:ml-2" : "lg:mt-2"}`}>
            <h2 className={`font-bold `}>
              {post.title}
            </h2>
            <p className="text-sm">{formattedDate}</p>
            {showExtract && (
            <div
            className={`mt-2`}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
              /> 
           )}
          </div>
        </div>

    
      </Link>
    </article>
  );
};

export default PostComponent;