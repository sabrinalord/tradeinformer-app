

import CategorySection from "./components/CategorySection";
import Navbar from "./components/Navbar";
import SocialNavbar from "./components/SocialNavbar";
import DynamicHeroAd from "./components/DynamicHeroAd";
import { PostsResponse, Post, MenuResponse, MenuItem } from "./types";
import { fetchPosts, fetchHeaderMenu } from "@/lib/fetchData";
import { NewsletterSignUp } from "./components/NewsletterSignUp";

export const revalidate = 10;
export const dynamicParams = true;


  export default async function Home() {

      const postsData: PostsResponse  = await fetchPosts();
      const posts: Post[] = postsData?.data?.posts?.nodes || [];

      const headerMenuData: MenuResponse = await fetchHeaderMenu();
      const menuItems: MenuItem[] = headerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];

      const filterByCategoryName = (category: string, posts: Post[]): Post[] => {
       return posts.filter((post) => post.categories.nodes.some((cat) => cat.slug === category))
      }


  return ( 
    <>
      <NewsletterSignUp></NewsletterSignUp>

    <div className="overflow-hidden">
      <Navbar headerItems={menuItems}></Navbar>
      <SocialNavbar></SocialNavbar>
      <div className="container mx-auto">
        <DynamicHeroAd></DynamicHeroAd>
          <main className =" grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">

          {/* Mobile Layout */}

          <div className="col-span-1 sm:col-span-12 lg:hidden p-2 sm:p-4 ">
            <CategorySection filteredPosts={filterByCategoryName("featured", posts)} numberOfPosts={1}></CategorySection>
          </div>

           {/* Desktop Layout */}

            <div className="col-span-1 sm:col-span-6 lg:col-span-3 p-2 sm:p-4 ">
              <CategorySection filteredPosts={filterByCategoryName("tech-news", posts)} numberOfPosts={3}></CategorySection>
            </div>

            <div className="col-span-1  lg:col-span-6 border-l-2 border-r-2 border-gray-100 hidden lg:block p-2 sm:p-4 ">
              <CategorySection filteredPosts={filterByCategoryName("featured", posts)} numberOfPosts={1}></CategorySection>
              <div>
               <CategorySection filteredPosts={filterByCategoryName("newsletter", posts)} numberOfPosts={2} flexDirection="flex-row"></CategorySection>
              </div>
            </div>

            <div className="col-span-1 sm:col-span-6 lg:col-span-3 p-2 sm:p-4 ">
              <CategorySection filteredPosts={filterByCategoryName("broker-news", posts)} numberOfPosts={3}></CategorySection>
            </div>

          </main>
          </div>
      </div>
  </>
  );
}

