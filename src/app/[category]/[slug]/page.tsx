import { Post, SinglePostResponse, PostsResponse, MenuResponse, MenuItem} from "@/app/types";
import {fetchPosts, fetchPostBySlug, fetchHeaderMenu } from "../../../lib/fetchData"
import Image from "next/image";
import Navbar from "@/app/components/Navbar";

export async function generateStaticParams() {

    const postsData: PostsResponse  = await fetchPosts();
    let posts: Post[] = postsData?.data?.posts?.nodes || [];

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
    let menuItems: MenuItem[] = headerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];
    console.log('menu items are:',menuItems)
    const { slug } = params;

    const postsData: SinglePostResponse  = await fetchPostBySlug(slug);
    let post: Post = postsData?.data?.postBy || [];


    if (!post) {
        return <h1>Post not found!</h1>;
    }

    return (
        <div className="overflow-hidden">
        <Navbar headerItems={menuItems}></Navbar>
        <div className="container mx-auto sm:mx-8 md:mx-16 lg:mx-32">
            <main className =" grid grid-cols-1 sm:grid-cols-12 gap-4">
            <article className="col-span-8">
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </article>
            </main>
        </div>
        </div>
    )
  }