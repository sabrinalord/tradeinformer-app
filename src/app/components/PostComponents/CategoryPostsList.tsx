'use client';
import React, { useState } from 'react';
import { Post } from '../../types';
import PostComponent from './PostComponent';
import CategoryHeader from '../CategoryHeader';
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';


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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = numberOfPosts;

  if (!filteredPosts.length) return null;

  const validOffset = Math.min(offset, filteredPosts.length);
  const categoryName = filteredPosts[0].categories.nodes[0].name;
  const categorySlug = filteredPosts[0].categories.nodes[0].slug;

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
      
 <div className={`flex flex-col lg:${flexDirection} justify-center `}>
         {paginatedPosts.map((post, index) => (
        <PostComponent
          key={index}
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
  <div className="flex justify-center mt-4 space-x-4">
    {/* Previous Button */}
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`flex items-center px-4 py-2 border rounded ${
        currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white'
      }`}
    >
      <ChevronLeftIcon className="h-5 w-5" />
      
      <span className="ml-2">Previous</span>
    </button>

    {/* Next Button */}
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`flex items-center px-4 py-2 border rounded ${
        currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white'
      }`}
    >
      <span className="mr-2">Next</span>
      <ChevronRightIcon className="h-5 w-5" />
    </button>
  </div>
)}



  </div>
  )
};

export default CategoryPostsList;
