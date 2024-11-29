import { Post, SinglePostResponse, PostsResponse, MenuResponse, MenuItem} from "@/app/types";
import {fetchPosts, fetchPostBySlug, fetchHeaderMenu} from "../../../lib/fetchData"
import Navbar from "@/app/components/Navbar";
import { formatDate } from "../../../lib/dateFormatter";
import Advert from "@/app/components/Advert";
import Image from 'next/image';
import SocialNavbar from "@/app/components/SocialNavbar";
import styles from './Page.module.css';
import RandomCategorySidebar from "@/app/components/RandomCategorySidebar";
import Link from "next/link";



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


    const headerMenuData: MenuResponse = await fetchHeaderMenu();
    const menuItems: MenuItem[] = headerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];
 

    const postsData: SinglePostResponse  = await fetchPostBySlug(slug);
    const post: Post = postsData?.data?.postBy || [];

    const formattedDate = formatDate(post.date);
    const categoryName = post.categories.nodes[0]?.name || "Category";


    return (
        <div className="overflow-hidden">
        <Navbar headerItems={menuItems}></Navbar>
        <SocialNavbar></SocialNavbar>
      
        <div className="container mx-auto">
        <Advert type="desktop_billboard_top"></Advert>
            <main className ="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-8">
                <div className="col-span-1 sm:col-span-12 p-4">
                   <Link className={styles.link} href={`/${category}`}>{categoryName}</Link> 
                    <h1 className="font-bold lg:text-[1.6em] mb-4">{post.title}</h1>
                    <p className="mt-2 text-sm">
                        <span className="">By <strong>{post.author.node.name}</strong> </span>   
                        <span className="ml-2 mr-2 text-gray-200"> | </span>  
                        <span className="ml-2">{formattedDate}</span>
                        </p>
                    <div className="border-b mt-5 sm:mt-10 sm:mb-4"></div>
                </div>

            <article className="col-span-1 sm:col-span-12 lg:col-span-8 sm:p-4">
                <Image className="lg:p-4"
                              src={post.featuredImage.node.sourceUrl} 
                              width="800"
                              height="800" 
                              alt={post.featuredImage.node.altText || 'Featured Image'} >
                    </Image> 
    
                <div className={` ${styles.content} mt-4`} dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </article>

            <div className="col-span-1 sm:col-span-6  lg:col-span-3  p-2 sm:p-4 ">
                <Advert type="sidebar"></Advert>
                <RandomCategorySidebar alreadyDisplayedCategory={category}></RandomCategorySidebar>
              </div>
            </main>
        </div>
        </div>
    )
  }