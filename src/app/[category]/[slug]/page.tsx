import { Post, SinglePostResponse, PostsResponse, MenuResponse, MenuItem} from "@/app/types";
import {fetchPosts, fetchPostBySlug, fetchHeaderMenu, fetchPostsByCategory } from "../../../lib/fetchData"
import Navbar from "@/app/components/Navbar";
import CategorySection from "@/app/components/CategorySection";
import Advert from "@/app/components/Advert";
import Image from 'next/image';
import SocialNavbar from "@/app/components/SocialNavbar";
import styles from './Page.module.css';



export const revalidate = 10;
export const dynamicParams = true;



export async function generateStaticParams() {

    const postsData: PostsResponse  = await fetchPosts();
    const posts: Post[] = postsData?.data?.posts?.nodes || [];

    if (!Array.isArray(posts)){
        console.error('fetchPosts did not return an array');
        return [];
    }

    return posts.map((post: Post) => ({
        slug: post.slug,
    }));

}

export default async function Page({ params }: { params: { slug: string } }) {

    const headerMenuData: MenuResponse = await fetchHeaderMenu();
    const menuItems: MenuItem[] = headerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];
    const { slug } = params;

    const postsData: SinglePostResponse  = await fetchPostBySlug(slug);
    const post: Post = postsData?.data?.postBy || [];

    const date = new Date(post.date);

    const options: Intl.DateTimeFormatOptions = { 
        year: "numeric", 
        month: "long",   
        day: "numeric", 
      };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);


    const sidebarPostsData: PostsResponse  = await fetchPostsByCategory("interviews");
    const sidebarPosts: Post[] = sidebarPostsData?.data?.posts?.nodes ?? [];


    if (!post) {
        return <h1>Post not found!</h1>;
    }

    return (
        <div className="overflow-hidden">
        <Navbar headerItems={menuItems}></Navbar>
        <SocialNavbar></SocialNavbar>
      
        <div className="container mx-auto">
        <Advert type="desktop_billboard_top"></Advert>
            <main className ="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-8">
            <article className="col-span-8 p-4">
                <h1 className="font-bold lg:text-[1.6em] mb-4">{post.title}</h1>
                <Image className=""
                              src={post.featuredImage.node.sourceUrl} 
                              width="800"
                              height="800" 
                              alt={post.featuredImage.node.altText || 'Featured Image'} >
                    </Image> 
                <p className="mt-2">By {post.author.node.name} | {formattedDate}</p>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </article>

            <div className="sm:col-span-3  p-2 sm:p-4 ">
                <Advert type="sidebar"></Advert>
                <CategorySection filteredPosts={sidebarPosts} numberOfPosts={2} showExtract={false}></CategorySection>
              
              </div>
            </main>
        </div>
        </div>
    )
  }