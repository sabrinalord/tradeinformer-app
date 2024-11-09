import { Post, SinglePostResponse, PostsResponse, MenuResponse, MenuItem} from "@/app/types";
import {fetchPosts, fetchPostBySlug, fetchHeaderMenu, fetchPostsByCategory } from "../../../lib/fetchData"
import Navbar from "@/app/components/Navbar";
import CategorySection from "@/app/components/CategorySection";



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

    const sidebarPostsData: PostsResponse  = await fetchPostsByCategory("interviews");
    const sidebarPosts: Post[] = sidebarPostsData?.data?.posts?.nodes ?? [];




    if (!post) {
        return <h1>Post not found!</h1>;
    }

    return (
        <div className="overflow-hidden">
        <Navbar headerItems={menuItems}></Navbar>
        <div className="container mx-auto sm:mx-8 md:mx-16 lg:mx-32">
            <main className =" grid grid-cols-1 sm:grid-cols-12 gap-4">
            <article className="col-span-8 p-4">
                <h1 className="font-bold text-[1.4em] mb-4">{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </article>

            <div className="sm:col-span-3  p-2 sm:p-4 ">
                <CategorySection filteredPosts={sidebarPosts} numberOfPosts={2} showExtract={false}></CategorySection>
              </div>
            </main>
        </div>
        </div>
    )
  }