import React from 'react';
import { Post } from '../../types';
import Link from 'next/link'; 
import Image from 'next/image';
import CategoryHeader from '../CategoryHeader';


interface CategoryFeaturedPostProps {
  post: Post;
  showCategoryHeader?: boolean;
}


const CategoryFeaturedPost: React.FC<CategoryFeaturedPostProps> =  ({
  post,
  showCategoryHeader = true,
 }) => {

  if (!post) return null;


  const categoryName = post.categories.nodes[0].name;
  const categorySlug = post.categories.nodes[0].slug;

    return (
        <div>
            {showCategoryHeader && (
              <CategoryHeader categoryName={categoryName} ></CategoryHeader>
            )}

   <article className="bg-gray-100 flex flex-col lg:flex-row m-2 p-4 gap-2 mb-2">

  <div className="lg:min-w-[300px]">
    <Image
      className="object-cover max-h-[280px] w-[full]"
      src={post.featuredImage.node.sourceUrl}
      alt={post.featuredImage.node.altText || 'Featured Image'} 
      width={600}
      height={600}
    />
  </div>


  <div className="m-2">
    <Link href={`/${categorySlug}/${post.slug}`}>
      <h2 className="text-2xl lg:text-2xl font-bold leading-tight mb-4 hover:underline hover:text-linkBlue">
        {post.title}
      </h2>
      <div 
        dangerouslySetInnerHTML={{ __html: post.excerpt }} 
        className="text-gray-700">
      </div>
    </Link>
  </div>
</article>

      
      </div>

    )
    
}


export default CategoryFeaturedPost;

