import React from 'react';
import { Post } from '../types';
import PostComponent from './PostComponents/PostComponent';
import CategoryHeader from './CategoryHeader';

interface CategoryPostsListProps {
  numberOfPosts: number;
  filteredPosts: Post[];
  offset?: number;
  firstPostHasLargeImage?: boolean;
  showImage?: boolean;
  showExtract?: boolean;
  flexDirection?: 'flex-col' | 'flex-row';
  inlineTextOnDesktop?: boolean;
  showCategoryTitle?: boolean;
}

const CategoryPostsList: React.FC<CategoryPostsListProps> = ({
  filteredPosts,
  numberOfPosts,
  offset = 0,
  firstPostHasLargeImage = true,
  showImage = true,
  showExtract = true,
  flexDirection = 'flex-col',
  inlineTextOnDesktop = false,
  showCategoryTitle = true,
}) => {
  if (!filteredPosts.length) return null;

  const validOffset = Math.min(offset, filteredPosts.length);
  const categoryName = filteredPosts[0].categories.nodes[0].name;
  const categorySlug = filteredPosts[0].categories.nodes[0].slug;
  const displayedPosts = filteredPosts.slice(validOffset, validOffset + numberOfPosts);
  const firstPost = displayedPosts[0];

  return (
    <div>

       {showCategoryTitle && (       
        <CategoryHeader categoryName={categoryName} />
)}
      
 <div className={`flex flex-col lg:${flexDirection} justify-between `}>
         {/* Render First Post */}
         {firstPost && (
        <PostComponent
          post={firstPost}
          showImage={showImage}
          showExtract={showExtract}
          inlineTextOnDesktop={inlineTextOnDesktop}
          firstPostHasLargeImage={firstPostHasLargeImage}
          isFirstPost={true}
          flexDirection={flexDirection}
          categorySlug={categorySlug}
        />
      )}

      {/* Render Remaining Posts */}
        {displayedPosts.map((post, index) => index !== 0 && (
          <PostComponent
            post={post}
            showImage={showImage}
            showExtract={showExtract}
            inlineTextOnDesktop={inlineTextOnDesktop}
            firstPostHasLargeImage={firstPostHasLargeImage}
            isFirstPost={false}
            categorySlug={categorySlug}
            flexDirection={flexDirection}
            key={post.id}
          />
        ))}
     
 </div>
    </div>
  );
};

export default CategoryPostsList;
