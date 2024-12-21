'use client';
import React, { useState } from 'react';
import { Post } from '../../types';
import PostComponent from './PostComponent';
import CategoryHeader from '../CategoryHeader';

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
  hasPagination?: boolean;
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
  hasPagination = false,
}) => {
  if (!filteredPosts.length) return null;

  const validOffset = Math.min(offset, filteredPosts.length);
  const categoryName = filteredPosts[0].categories.nodes[0].name;
  const categorySlug = filteredPosts[0].categories.nodes[0].slug;
  const initialPosts = filteredPosts.slice(validOffset, validOffset + numberOfPosts);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = numberOfPosts;

  const paginatedPosts = filteredPosts.slice(
    validOffset + (currentPage - 1) * postsPerPage,
    validOffset + currentPage * postsPerPage
  );
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>

       {showCategoryTitle && (       
        <CategoryHeader categoryName={categoryName} />
)}
      
 <div className={`flex flex-col lg:${flexDirection} `}>
         {paginatedPosts.map((post, index) => (
        <PostComponent
          post={post}
          showImage={showImage}
          showExtract={showExtract}
          inlineTextOnDesktop={inlineTextOnDesktop}
          firstPostHasLargeImage={firstPostHasLargeImage}
          isFirstPost={index === 0}
          flexDirection={flexDirection}
          categorySlug={categorySlug}
        />
      ))}
     
 </div>
 {hasPagination && totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(totalPages)].map((_, pageIndex) => {
            const page = pageIndex + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border ${
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-500 border-blue-500'
                }`}
              >
                {page}
              </button>
            );
          })}
    </div>
  )}
  </div>
  )
};

export default CategoryPostsList;
