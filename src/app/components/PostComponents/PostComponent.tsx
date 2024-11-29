import React from 'react';
import { Post } from '../../types';
import Link from 'next/link';
import ImageComponent from './ImageComponent';
import { formatDate } from '@/lib/dateFormatter';

interface PostProps {
  post: Post;
  showImage: boolean;
  showExtract: boolean;
  inlineText: boolean;
  firstPostHasLargeImage: boolean;
  isFirstPost: boolean;
  categorySlug: string;
}

const PostComponent: React.FC<PostProps> = ({
  post,
  showImage = true,
  showExtract = true,
  inlineText = false,
  firstPostHasLargeImage = true,
  isFirstPost,
  categorySlug,
}) => {
  const formattedDate = formatDate(post.date);

  return (
    <article className={`pb-4 m-2 ${inlineText ? '' : 'border-b'} `} key={post.id}>
      <Link href={`/${categorySlug}/${post.slug}`}>
        <div className={` ${inlineText && !firstPostHasLargeImage ? 'flex flex-row' : ' flex flex-col'}`}>
          {showImage && post.featuredImage && (
            <ImageComponent
              src={post.featuredImage.node.sourceUrl}
              altText={post.featuredImage.node.altText}
              inlineText={inlineText}
              isFirstPost={isFirstPost}
              firstPostHasLargeImage={firstPostHasLargeImage}
            />
          )}
          <div className={` ${inlineText ? "ml-2" : "mt-2"}`}>
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
