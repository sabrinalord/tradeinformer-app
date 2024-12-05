import React from 'react';
import { Post } from '../../types';
import Link from 'next/link'; 
import Image from 'next/image';
import CategoryHeader from '../CategoryHeader';


interface CategoryFeaturedPostProps {
  post: Post;
}


const CategoryFeaturedPost: React.FC<CategoryFeaturedPostProps> =  ({
  post
 }) => {

  if (!post) return null;


  const categoryName = post.categories.nodes[0].name;
  const categorySlug = post.categories.nodes[0].slug;

    return (
        <div>
          <CategoryHeader categoryName={categoryName} showCategoryTitle></CategoryHeader>


   <article className="bg-gray-100 flex flex-col lg:flex-row m-2 p-4 gap-2 mb-2">

  <div className="flex-shrink-0 w-full h-auto lg:w-[400px] relative order-1 lg:order-none">
    <Image
      className="object-cover max-h-[250px] w-full"
      src={post.featuredImage.node.sourceUrl}
      alt={post.featuredImage.node.altText || 'Featured Image'} 
      width={800}
      height={800}
    />
  </div>


  <div className=" m-2 sm:m-4 lg:m-6 order-2 lg:order-none">
    <Link href={`/${categorySlug}/${post.slug}`}>
      <h2 className="text-2xl lg:text-3xl font-bold leading-tight mb-4 hover:underline hover:text-linkBlue">
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

