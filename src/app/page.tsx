

import CategoryPostsList from "./components/PostComponents/CategoryPostsList";
import Widget from "./components/Widget";

import YouTubePlayer from "./components/YoutubePlayer";
import PodcastPlayer from "./components/PodcastPlayer";
import { PostsResponse, Post } from "./types";                                           
import {fetchPosts } from "@/lib/fetchData";
import HomePageFeaturedPost from "./components/PostComponents/HomePageFeaturedPost";
import OneLargePost3SmallGrid from "./components/PostComponents/OneLargePost3SmallGrid";


export const dynamicParams = true;


  export default async function Home() {


    const allPostsData: PostsResponse = await fetchPosts();
    const allPosts: Post[] = allPostsData?.data?.posts?.nodes || [];
    const featuredPost = allPosts[0];
// do not filter the latest post as this is the featured post
    
const filterByCategory = (categorySlug: string) => {
      return allPosts.slice(1).filter((post) => post.categories?.nodes[0]?.slug === categorySlug);
    };


  return ( 
    <>
    <div className="overflow-hidden">

      <div className="container mx-auto p-2">
         
          <main className =" grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">
              <div className="block lg:hidden col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
                <HomePageFeaturedPost post={featuredPost} categorySlug={featuredPost.categories.nodes[0].slug}></HomePageFeaturedPost>
                <div>
                <CategoryPostsList categorySlug="newsletter" filteredPosts={filterByCategory("newsletter") || []} numberOfPosts={4} firstPostHasLargeImage={false}></CategoryPostsList>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
                <div className="sm:max-w-[300px] sm:flex sm:justify-center sm:items-center mx-auto">
                   <Widget type='sidebar'></Widget>
                </div>

                <CategoryPostsList categorySlug="tech-news" filteredPosts={filterByCategory("tech-news") || []} numberOfPosts={3} inlineTextOnDesktop showExtract={false}></CategoryPostsList>
              </div>

              <div className="col-span-1 hidden lg:block lg:col-span-6 border-l-2 border-r-2 border-gray-100 sm:p-2 ">
              <HomePageFeaturedPost post={featuredPost} categorySlug={featuredPost.categories.nodes[0].slug}></HomePageFeaturedPost>
              <div>
                <CategoryPostsList categorySlug="newsletter" filteredPosts={filterByCategory("newsletter")} numberOfPosts={2} flexDirection="flex-row" firstPostHasLargeImage={false} ></CategoryPostsList>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
                <CategoryPostsList categorySlug="broker-news" filteredPosts={filterByCategory("broker-news") || []} inlineTextOnDesktop numberOfPosts={3} showExtract={false}></CategoryPostsList>
               <div className="hidden lg:block">
                 <Widget type='sidebar'></Widget>              
               </div>
                </div>

              <div className="col-span-1 sm:col-span-12">
              <Widget type="desktop_billboard_middle"></Widget>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-9 sm:p-2 ">
                <CategoryPostsList categorySlug="institutional-trading" filteredPosts={filterByCategory("institutional-trading") || []} numberOfPosts={3} flexDirection = 'flex-row' firstPostHasLargeImage></CategoryPostsList>
              </div>

              <div className=" col-span-1 lg:col-span-3 sm:p-2 ">
              <Widget type='sidebar'></Widget>
              </div>


              <div className="col-span-1  sm:col-span-12 lg:col-span-9  sm:p-2 lg:flex ">
                  <div className="col-span-1  sm:col-span-12 lg:col-span-6  sm:p-2 ">
                  <OneLargePost3SmallGrid filteredPosts={filterByCategory("interviews") || []} numberOfPosts={4} showExtract={false} ></OneLargePost3SmallGrid >
                  </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3   sm:p-2 ">
                <CategoryPostsList categorySlug="guest-posts" filteredPosts={filterByCategory("guest-posts") || []} numberOfPosts={3} showExtract={false}></CategoryPostsList>
              </div>

              <div className="col-span-1 sm:col-span-12">
              <Widget type="desktop_billboard_middle"></Widget>
              </div>

              <div className=" col-span-1 sm:col-span-12 lg:col-span-6  sm:p-2 ">
                <YouTubePlayer></YouTubePlayer>
              </div>

              <div className=" col-span-1 sm:col-span-12 lg:col-span-6 sm:p-2 ">
                <PodcastPlayer></PodcastPlayer>
              </div>
             
             <div className="col-span-1 sm:col-span-12 lg:col-span-9 sm:p-2 ">
                <CategoryPostsList categorySlug="start-a-broker" filteredPosts={filterByCategory("start-a-broker") || []} numberOfPosts={3} flexDirection = 'flex-row'></CategoryPostsList>

                <div className="mt-4">
                <CategoryPostsList categorySlug="fx-cfd-liscensing" filteredPosts={filterByCategory("fx-cfd-liscensing") || []} numberOfPosts={4} flexDirection = 'flex-row'></CategoryPostsList>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
                <div className="col-span-1 sm:col-span-5 lg:col-span-3" ></div>
                <Widget type='sidebar'></Widget>                
              </div>

      
          </main>
          </div>
      </div>
  </>
  );
}

