

import CategorySection from "./components/CategorySection";
import Advert from "./components/Advert";
import Navbar from "./components/Navbar";
import SocialNavbar from "./components/SocialNavbar";
import YouTubePlayer from "./components/YoutubePlayer";
import PodcastPlayer from "./components/PodcastPlayer";

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
        <Advert type="desktop_billboard_top"></Advert>
          <main className =" grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">

              <div className="block lg:hidden col-span-1 sm:col-span-12 lg:col-span-3 p-2 sm:p-4 ">
                <CategorySection filteredPosts={filterByCategoryName("featured", posts)} numberOfPosts={1}></CategorySection>
                <div>
                <CategorySection filteredPosts={filterByCategoryName("newsletter", posts)} inlineTitle={true} numberOfPosts={4} firstPostHasLargeImage={false}></CategorySection>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 p-2 sm:p-4 ">
                <CategorySection filteredPosts={filterByCategoryName("tech-news", posts)} numberOfPosts={3}></CategorySection>
              </div>

              <div className="col-span-1 hidden lg:block lg:col-span-6 border-l-2 border-r-2 border-gray-100 p-2 sm:p-4 ">
                <CategorySection filteredPosts={filterByCategoryName("featured", posts)} numberOfPosts={1}></CategorySection>
                <div>
                <CategorySection filteredPosts={filterByCategoryName("newsletter", posts)} numberOfPosts={2} flexDirection="flex-row" ></CategorySection>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 p-2 sm:p-4 ">
                <CategorySection filteredPosts={filterByCategoryName("broker-news", posts)} numberOfPosts={3}></CategorySection>
              </div>

              <div className="col-span-1 sm:col-span-12">
              <Advert type="desktop_billboard_middle"></Advert>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-9 p-2 sm:p-4 ">
                <CategorySection filteredPosts={filterByCategoryName("institutional-trading", posts)} numberOfPosts={3} flexDirection = 'flex-row'></CategorySection>
              </div>

              <div className=" col-span-1 lg:col-span-3 p-2 sm:p-4 ">
              <Advert type="sidebar"></Advert>
              </div>


              <div className="col-span-1  sm:col-span-12 lg:col-span-9  p-2 sm:p-4 lg:flex ">
                  <div className="col-span-1  sm:col-span-12 lg:col-span-6  p-2 sm:p-4 ">
                  < CategorySection filteredPosts={filterByCategoryName("interviews", posts)} numberOfPosts={1} showExtract={false} ></CategorySection>
                  </div>

                  <div className="col-span-1  sm:col-span-12 lg:col-span-3  p-2 sm:p-4 ">
                  <CategorySection filteredPosts={filterByCategoryName("interviews", posts)} numberOfPosts={3} showCategoryTitle={false} offset={1} firstPostHasLargeImage={false} inlineTitle={true} showExtract={false} ></CategorySection>
                  </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3   p-2 sm:p-4 ">
                <CategorySection filteredPosts={filterByCategoryName("guest-posts", posts)} numberOfPosts={2} showExtract={false}></CategorySection>
              </div>

              <div className=" col-span-1 sm:col-span-12 lg:col-span-6  p-2 sm:p-4 ">
                <YouTubePlayer></YouTubePlayer>
              </div>

              <div className=" col-span-1 sm:col-span-12 lg:col-span-6 p-2 sm:p-4 ">
                <PodcastPlayer></PodcastPlayer>
              </div>
             
             <div className="col-span-1 sm:col-span-12 lg:col-span-9 p-2 sm:p-4 ">
                <CategorySection filteredPosts={filterByCategoryName("start-a-broker", posts)} numberOfPosts={3} flexDirection = 'flex-row'></CategorySection>
                <div className="mt-4">
                <CategorySection filteredPosts={filterByCategoryName("fx-cfd-licensing", posts)} numberOfPosts={4} flexDirection = 'flex-row'></CategorySection>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-3 p-2 sm:p-4 ">
               <Advert type="sidebar"></Advert>
                <CategorySection filteredPosts={filterByCategoryName("newsletter", posts)} numberOfPosts={4} showImage={false}></CategorySection>
              </div>

       
          </main>
          </div>
      </div>
  </>
  );
}

