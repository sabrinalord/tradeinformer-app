import React from 'react';
import { Post } from '../../types';
import PostComponent from './PostComponent';
import CategoryHeader from '../CategoryHeader';
import LoadMorePosts from './LoadMorePosts';

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
  hasLoadMore?: boolean;
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
  hasLoadMore = false,
}) => {
  if (!filteredPosts.length) return null;

  const validOffset = Math.min(offset, filteredPosts.length);
  const categoryName = filteredPosts[0].categories.nodes[0].name;
  const categorySlug = filteredPosts[0].categories.nodes[0].slug;
  const initialPosts = filteredPosts.slice(validOffset, validOffset + numberOfPosts);
  const firstPost = initialPosts[0];

  return (
    <div>

       {showCategoryTitle && (       
        <CategoryHeader categoryName={categoryName} />
)}
      
 <div className={`flex flex-col lg:${flexDirection} `}>
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
        {initialPosts.map((post, index) => index !== 0 && (
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
      {hasLoadMore && (
      <LoadMorePosts 
      allPosts={filteredPosts} 
      initialCount={numberOfPosts} 
      increment={5} 
      categorySlug={categorySlug}
      flexDirection={flexDirection}
      inlineTextOnDesktop={ inlineTextOnDesktop}
      >
      </LoadMorePosts>
      )}
    </div>
  );
};

export default CategoryPostsList;
