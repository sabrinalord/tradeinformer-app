

import CategoryPostsList from "./components/CategoryPostsList";
import Advert from "./components/Advert";
import Navbar from "./components/Navbar";
import SocialNavbar from "./components/SocialNavbar";
import YouTubePlayer from "./components/YoutubePlayer";
import PodcastPlayer from "./components/PodcastPlayer";
import { PostsResponse, MenuResponse, MenuItem } from "./types";                                           
import { NewsletterSignUp } from "./components/NewsletterSignUp";
import { fetchHeaderMenu, fetchPostsByCategory } from "@/lib/fetchData";


export const revalidate = 10;
export const dynamicParams = true;


  export default async function Home() {

    const headerMenuData: MenuResponse = await fetchHeaderMenu();
    const menuItems: MenuItem[] = headerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];

      const featuredPost: PostsResponse = await fetchPostsByCategory("featured");
      const newsletterPosts: PostsResponse = await fetchPostsByCategory("newsletter");
      const techNewsPosts: PostsResponse = await fetchPostsByCategory("tech-news");
      const brokerNewsPosts: PostsResponse = await fetchPostsByCategory("broker-news");
      const institutionalTradingPosts: PostsResponse = await fetchPostsByCategory("institutional-trading");
      const interviewsPosts: PostsResponse = await fetchPostsByCategory("interviews");
      const guestPosts: PostsResponse = await fetchPostsByCategory("guest-posts");
      const startABrokerPosts: PostsResponse = await fetchPostsByCategory("start-a-broker");
      const fxCfdLicensingPosts: PostsResponse = await fetchPostsByCategory("fx-cfd-licensing");
    

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
                <CategoryPostsList filteredPosts={featuredPost?.data?.posts?.nodes || []} numberOfPosts={1} firstPostHasLargeImage ></CategoryPostsList>
                <div>
                <CategoryPostsList filteredPosts={newsletterPosts?.data?.posts?.nodes || []} numberOfPosts={4} firstPostHasLargeImage={false}></CategoryPostsList>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 p-2 sm:p-4 ">
                <CategoryPostsList filteredPosts={techNewsPosts?.data?.posts?.nodes || []} numberOfPosts={3}></CategoryPostsList>
              </div>

              <div className="col-span-1 hidden lg:block lg:col-span-6 border-l-2 border-r-2 border-gray-100 p-2 sm:p-4 ">
                <CategoryPostsList filteredPosts={featuredPost?.data?.posts?.nodes || []} numberOfPosts={1}></CategoryPostsList>
                <div>
                <CategoryPostsList filteredPosts={newsletterPosts?.data?.posts?.nodes || []} numberOfPosts={2} flexDirection="flex-row" firstPostHasLargeImage={false} ></CategoryPostsList>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 p-2 sm:p-4 ">
                <CategoryPostsList filteredPosts={brokerNewsPosts?.data?.posts?.nodes || []} numberOfPosts={3}></CategoryPostsList>
              </div>

              <div className="col-span-1 sm:col-span-12">
              <Advert type="desktop_billboard_middle"></Advert>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-9 p-2 sm:p-4 ">
                <CategoryPostsList filteredPosts={institutionalTradingPosts?.data?.posts?.nodes || []} numberOfPosts={3} flexDirection = 'flex-row'></CategoryPostsList>
              </div>

              <div className=" col-span-1 lg:col-span-3 p-2 sm:p-4 ">
              <Advert type="sidebar"></Advert>
              </div>


              <div className="col-span-1  sm:col-span-12 lg:col-span-9  p-2 sm:p-4 lg:flex ">
                  <div className="col-span-1  sm:col-span-12 lg:col-span-6  p-2 sm:p-4 ">
                  < CategoryPostsList filteredPosts={interviewsPosts?.data?.posts?.nodes || []} numberOfPosts={1} showExtract={false} ></CategoryPostsList>
                  </div>

                  <div className="col-span-1  sm:col-span-12 lg:col-span-3  p-2 sm:p-4 lg:mt-8">
                  <CategoryPostsList filteredPosts={interviewsPosts?.data?.posts?.nodes || []} numberOfPosts={3} showCategoryTitle={false} offset={1} firstPostHasLargeImage={false} inlineTextOnDesktop={true} showExtract={false} ></CategoryPostsList>
                  </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3   p-2 sm:p-4 ">
                <CategoryPostsList filteredPosts={guestPosts?.data?.posts?.nodes || []} numberOfPosts={2} showExtract={false}></CategoryPostsList>
              </div>

              <div className=" col-span-1 sm:col-span-12 lg:col-span-6  p-2 sm:p-4 ">
                <YouTubePlayer></YouTubePlayer>
              </div>

              <div className=" col-span-1 sm:col-span-12 lg:col-span-6 p-2 sm:p-4 ">
                <PodcastPlayer></PodcastPlayer>
              </div>
             
             <div className="col-span-1 sm:col-span-12 lg:col-span-9 p-2 sm:p-4 ">
                <CategoryPostsList filteredPosts={startABrokerPosts?.data?.posts?.nodes || []} numberOfPosts={3} flexDirection = 'flex-row'></CategoryPostsList>
                <div className="mt-4">
                <CategoryPostsList filteredPosts={fxCfdLicensingPosts?.data?.posts?.nodes || []} numberOfPosts={4} flexDirection = 'flex-row'></CategoryPostsList>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 p-2 sm:p-4 ">
                <div className="col-span-1 sm:col-span-5 lg:col-span-3" ></div>
               <Advert type="sidebar"></Advert>
                <CategoryPostsList filteredPosts={newsletterPosts?.data?.posts?.nodes || []} offset={3} numberOfPosts={4} showImage={false}></CategoryPostsList>
              </div>

       
          </main>
          </div>
      </div>
  </>
  );
}

