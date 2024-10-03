

import Image from "next/image";
import CategorySection from "./components/CategorySection";
import Navbar from "./components/Navbar";
import { PostsResponse, Post, MenuResponse, MenuItem } from "./types";
import { fetchPosts, fetchHeaderMenu } from "@/lib/fetchData";

export const revalidate = 10;
export const dynamicParams = true;


  export default async function Home() {

      const postsData: PostsResponse  = await fetchPosts();
      let posts: Post[] = postsData?.data?.posts?.nodes || [];

      const headerMenuData: MenuResponse = await fetchHeaderMenu();
      let menuItems: MenuItem[] = headerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];

      const filterByCategoryName = (category: string, posts: Post[]): Post[] => {
       return posts.filter((post) => post.categories.nodes.some((cat) => cat.slug === category))
      }


  return ( 
    <div className="overflow-hidden">
      <Navbar headerItems={menuItems}></Navbar>
      <div className="container mx-auto">
          <main className =" grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
            
            <div className="p-4 col-span-1 sm:col-span-3">
              <CategorySection filteredPosts={filterByCategoryName("tech-news", posts)} numberOfPosts={5}></CategorySection>
            </div>

            <div className=" p-4 col-span-1 sm:col-span-6 border-l-2 border-r-2 border-gray-100">
              <CategorySection filteredPosts={filterByCategoryName("featured", posts)} numberOfPosts={1}></CategorySection>
              <div>
               <CategorySection filteredPosts={filterByCategoryName("newsletter", posts)} numberOfPosts={2} flexDirection="flex-row"></CategorySection>
              </div>
            </div>

            <div className=" p-4 col-span-1 sm:col-span-3">
              <CategorySection filteredPosts={filterByCategoryName("broker-news", posts)} numberOfPosts={5}></CategorySection>
            </div>

          </main>


      </div>
    </div>
  );
}

