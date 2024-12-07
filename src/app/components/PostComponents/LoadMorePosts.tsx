'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Post } from '../../types';
import PostComponent from './PostComponent';

interface LoadMorePostsProps {
  allPosts: Post[];
  initialCount: number;
  increment: number;
  categorySlug: string;
  showImage?: boolean;
  showExtract?: boolean;
  flexDirection?: 'flex-col' | 'flex-row';
  inlineTextOnDesktop?: boolean;
  firstPostHasLargeImage?: boolean;
}

const LoadMorePosts: React.FC<LoadMorePostsProps> = ({
  allPosts,
  initialCount,
  increment,
  categorySlug,
  showImage = true,
  showExtract = true,
  flexDirection = 'flex-col',
  inlineTextOnDesktop = false,
}) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + increment, allPosts.length));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < allPosts.length) {
          handleLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    const currentObserverRef = observerRef.current; 

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [visibleCount, allPosts.length]);

  const displayedPosts = allPosts.slice(initialCount, visibleCount); // Load posts after the initial count

  return (
    <>
 
      {/* Dynamically Loaded Posts */}
      <div className={`flex flex-col lg:${flexDirection} justify-between`}>
        {displayedPosts.map((post) => (
          <PostComponent
            post={post}
            showImage={showImage}
            showExtract={showExtract}
            inlineTextOnDesktop={inlineTextOnDesktop}
            firstPostHasLargeImage={false}
            isFirstPost={false}
            categorySlug={categorySlug}
            flexDirection={flexDirection}
            key={post.id}
          />
        ))}
      </div>

      {/* Sentinel Element for IntersectionObserver */}
      {visibleCount < allPosts.length && (
        <div
          ref={observerRef}
          className="w-full h-10 mt-4 bg-transparent"
          aria-label="Loading more posts"
        />
      )}
    </>
  );
};

export default LoadMorePosts;
