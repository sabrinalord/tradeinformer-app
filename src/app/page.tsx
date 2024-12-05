

import CategoryPostsList from "./components/CategoryPostsList";
import Advert from "./components/Advert";
import Navbar from "./components/Navbar";
import SocialNavbar from "./components/SocialNavbar";
import YouTubePlayer from "./components/YoutubePlayer";
import PodcastPlayer from "./components/PodcastPlayer";
import { PostsResponse, Post, MenuResponse, MenuItem } from "./types";                                           
import { NewsletterSignUp } from "./components/NewsletterSignUp";
import { fetchFooterMenu, fetchHeaderMenu, fetchPosts } from "@/lib/fetchData";
import Footer from "./components/Footer";
import HomePageFeaturedPost from "./components/PostComponents/HomePageFeaturedPost";
import OneLargePost3SmallGrid from "./components/PostComponents/OneLargePost3SmallGrid";


export const revalidate = 10;
export const dynamicParams = true;


  export default async function Home() {

    const headerMenuData: MenuResponse = await fetchHeaderMenu();
    const menuItems: MenuItem[] = headerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];

    const footerMenuData: MenuResponse = await fetchFooterMenu();
    const footerMenuItems: MenuItem[] = footerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];
    
    const allPostsData: PostsResponse = await fetchPosts();
    const allPosts: Post[] = allPostsData?.data?.posts?.nodes || [];




    const featuredPost = allPosts[0];
// do not filter the latest post as this is the featured post
    
const filterByCategory = (categorySlug: string) => {
      return allPosts.slice(1).filter((post) => post.categories?.nodes[0]?.slug === categorySlug);
    };


  return ( 
    <>
      <NewsletterSignUp></NewsletterSignUp>

    <div className="overflow-hidden">
      <Navbar headerItems={menuItems}></Navbar>
      <SocialNavbar></SocialNavbar>

      <div className="container mx-auto p-2">
        <Advert type="desktop_billboard_top"></Advert>
         
          <main className =" grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
              <div className="block lg:hidden col-span-1 sm:col-span-12 lg:col-span-3 sm:p-4 ">
                <HomePageFeaturedPost post={featuredPost} categorySlug={featuredPost.categories.nodes[0].slug}></HomePageFeaturedPost>
                <div>
                <CategoryPostsList filteredPosts={filterByCategory("newsletter") || []} numberOfPosts={4} firstPostHasLargeImage={false}></CategoryPostsList>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-4 ">
                <CategoryPostsList filteredPosts={filterByCategory("tech-news") || []} numberOfPosts={3}></CategoryPostsList>
              </div>

              <div className="col-span-1 hidden lg:block lg:col-span-6 border-l-2 border-r-2 border-gray-100 sm:p-4 ">
              <HomePageFeaturedPost post={featuredPost} categorySlug={featuredPost.categories.nodes[0].slug}></HomePageFeaturedPost>
              <div>
                <CategoryPostsList filteredPosts={filterByCategory("newsletter")} numberOfPosts={2} flexDirection="flex-row" firstPostHasLargeImage={false} ></CategoryPostsList>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-4 ">
                <CategoryPostsList filteredPosts={filterByCategory("broker-news") || []} numberOfPosts={3}></CategoryPostsList>
              </div>

              <div className="col-span-1 sm:col-span-12">
              <Advert type="desktop_billboard_middle"></Advert>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-9 sm:p-4 ">
                <CategoryPostsList filteredPosts={filterByCategory("institutional-trading") || []} numberOfPosts={3} flexDirection = 'flex-row' firstPostHasLargeImage></CategoryPostsList>
              </div>

              <div className=" col-span-1 lg:col-span-3 sm:p-4 ">
              <Advert type="sidebar"></Advert>
              </div>


              <div className="col-span-1  sm:col-span-12 lg:col-span-9  sm:p-4 lg:flex ">
                  <div className="col-span-1  sm:col-span-12 lg:col-span-6  sm:p-4 ">
                  <OneLargePost3SmallGrid filteredPosts={filterByCategory("interviews") || []} numberOfPosts={4} showExtract={false}></OneLargePost3SmallGrid >
                  </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3   sm:p-4 ">
                <CategoryPostsList filteredPosts={filterByCategory("guest-posts") || []} numberOfPosts={2} showExtract={false}></CategoryPostsList>
              </div>

              <div className=" col-span-1 sm:col-span-12 lg:col-span-6  sm:p-4 ">
                <YouTubePlayer></YouTubePlayer>
              </div>

              <div className=" col-span-1 sm:col-span-12 lg:col-span-6 sm:p-4 ">
                <PodcastPlayer></PodcastPlayer>
              </div>
             
             <div className="col-span-1 sm:col-span-12 lg:col-span-9 sm:p-4 ">
                <CategoryPostsList filteredPosts={filterByCategory("start-a-broker") || []} numberOfPosts={3} flexDirection = 'flex-row'></CategoryPostsList>
                <CategoryPostsList filteredPosts={filterByCategory("start-a-broker") || []} offset={3} showCategoryTitle={false} numberOfPosts={3} flexDirection = 'flex-row'></CategoryPostsList>

                <div className="mt-4">
                <CategoryPostsList filteredPosts={filterByCategory("fx-cfd-liscensing") || []} numberOfPosts={4} flexDirection = 'flex-row'></CategoryPostsList>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-4 ">
                <div className="col-span-1 sm:col-span-5 lg:col-span-3" ></div>
               <Advert type="sidebar"></Advert>
                <CategoryPostsList filteredPosts={filterByCategory("newsletter") || []} offset={3} numberOfPosts={3} showImage={false}></CategoryPostsList>
              </div>

       
          </main>
          </div>
          <Footer footerItems={footerMenuItems}></Footer>
      </div>
  </>
  );
}

