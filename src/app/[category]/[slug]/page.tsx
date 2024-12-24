import { Post, SinglePostResponse, PostsResponse, MenuResponse, MenuItem} from "@/app/types";
import {fetchPosts, fetchPostBySlug, fetchHeaderMenu, fetchFooterMenu} from "../../../lib/fetchData"
import { formatDate } from "../../../lib/dateFormatter";
import Widget from "@/app/components/Widget";
import Image from 'next/image';
import styles from '../Page.module.css';
import RandomCategorySidebar from "@/app/components/RandomCategorySidebar";

import Link from "next/link";
import Footer from "@/app/components/Footer";
import SocialShareForArticles from "@/app/components/SocialShareForArticles";



export const revalidate = 60;
export const dynamicParams = true;


// below function is needed for static generation of post paths at build time
export async function generateStaticParams() {
    const postsData: PostsResponse = await fetchPosts();
    const posts: Post[] = postsData?.data?.posts?.nodes || [];

    posts.forEach((post) => {
        if (!post.categories?.nodes?.[0]?.slug) {
            console.error("Post missing category slug:", JSON.stringify(post, null, 2));
        }
    });

    return posts.map((post: Post) => ({
        category: post.categories.nodes[0].slug,
        slug: post.slug,
    }));
}

export default async function Page({
    params,
  }: {
    params: Promise<{category: string, slug: string  }>;
  }) {
    const { category, slug } = await params;


    const postData: SinglePostResponse  = await fetchPostBySlug(slug);
    const post: Post = postData?.data?.postBy || [];

    const formattedDate = formatDate(post.date);
    const categoryName = post.categories.nodes[0]?.name || "Category";


    return (
        <div className="overflow-hidden">
      
        <div className="container mx-auto p-2">
          <Widget type="desktop_billboard_top"></Widget>
            <main className ="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">
               
                <div className="hidden lg:block col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
                <Widget type="sidebar"></Widget>
                </div>
                    
            <article className="col-span-1 sm:col-span-12 lg:col-span-6 sm:p-2 ">
                <div className="">
                   <Link className={styles.link} href={`/${category}`}>{categoryName}</Link> 
                   <div className="flex justify-between">
                    <h1 className="font-bold lg:text-[1.6em] ">{post.title}</h1>

                   </div>
                    <div className="border-b mt-2 sm:mb-2"></div>

                    <div className="flex justify-between mt-2 mb-2">
                        <div className="text-xs">
                            <p >By <strong>{post.author.node.name}</strong></p>
                            <p>{formattedDate}</p>
                        </div>
                        <SocialShareForArticles articleTitle={post.title}></SocialShareForArticles>

                    </div>
                </div>
                <Image className="lg:p-6 ml-auto mr-auto"
                              src={post.featuredImage.node.sourceUrl} 
                              width="800"
                              height="800" 
                              alt={post.featuredImage.node.altText || 'Featured Image'} >
                    </Image> 
    
                <div className={` ${styles.content} mt-4`} dangerouslySetInnerHTML={{ __html: post.content }}></div>
                
                {post.tags.nodes && (
                    <div>
                        <ul className="flex flex-wrap text-sm">
                            <li className="inline-fle p-2 m-2 bg-[#266fef] text-white uppercase">
                            Tags
                            </li>
                            {post.tags.nodes.map((tag) => (
                                <li key={tag.uri} className="inline-flex">
                                <Link className="p-2 m-2 border  hover:bg-gray-100" href={tag.uri}>
                                    {tag.name}
                                </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    )}

            </article>

            <div className="lg:hidden col-span-1 sm:col-span-6 lg:col-span-3 sm:p-2 ">
                <Widget type="sidebar"></Widget>
                </div>
             

            <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
              <RandomCategorySidebar></RandomCategorySidebar>
             </div>

              
         
    
            </main>
        </div>

        </div>
    )
  }