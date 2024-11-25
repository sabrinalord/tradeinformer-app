import React from 'react';
import { Post } from '../types';
import Link from 'next/link'; 
import Image from 'next/image';


interface CategoryFeaturedPostProps {
  post: Post;
}


const CategoryFeaturedPost: React.FC<CategoryFeaturedPostProps> =  ({
  post
 }) => {

  if (!post) return null;


  const categoryName = post.categories.nodes[0].name;
  const categorySlug = post.categories.nodes[0].slug;


 const renderCategoryHeader = () => (

    <span className="flex items-center mb-4">
      <h1 className="ml-2 font-bold uppercase text-lg">{categoryName}</h1>
      <div className="flex-1 border-t border-gray-300 ml-2"></div>
    </span>
  
);


    return (
        <div className={` `}>
          {renderCategoryHeader()}

          <article className="bg-gray-100 p-6 flex flex-col lg:flex-row gap-6 mb-2">
          <div>
          <Link href={`/${categorySlug}/${post.slug}`}>
            <h2 className="text-2xl lg:text-3xl font-bold leading-tight mb-4">
            {post.title}
      
            </h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} className="text-gray-700"></div>
            </Link>
          </div>

          <div className="flex-shrink-0 lg:w-[400px] w-full h-auto relative">
            <Image className="object-cover max-h-[250px]"
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || 'Featured Image'} 
              width={800}
              height={800}
           
            />
          </div>

         
    
    </article>
      
      </div>

    )
    
}


export default CategoryFeaturedPost;

