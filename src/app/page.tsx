

import CategoryPostsList from "./components/PostComponents/CategoryPostsList";
import Widget from "./components/Widget";
import Navbar from "./components/Navbar";
import SocialNavbar from "./components/SocialNavbar";
import YouTubePlayer from "./components/YoutubePlayer";
import PodcastPlayer from "./components/PodcastPlayer";
import { PostsResponse, Post, MenuResponse, MenuItem, WidgetData } from "./types";                                           
import { fetchFooterMenu, fetchHeaderMenu, fetchPosts } from "@/lib/fetchData";
import Footer from "./components/Footer";
import HomePageFeaturedPost from "./components/PostComponents/HomePageFeaturedPost";
import OneLargePost3SmallGrid from "./components/PostComponents/OneLargePost3SmallGrid";
import WidgetListSidebar from "./components/WidgetListSidebar";


export const revalidate = 10;
export const dynamicParams = true;


  export default async function Home() {

    const fetchBanners = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/widget`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch banners');
        }
        
        const data: WidgetData[] = await res.json();
        return data;
      } catch (error) {
        console.error('Error fetching banners:', error);
        return []; 
      }
    };
 
  
    const banners = await fetchBanners();
const sidebarAds = banners.filter((banner) => banner.type === 'sidebar');
const desktopBillboardTopAds = banners.filter((banner) => banner.type === 'desktop_billboard_top');
const desktopBillboardMiddleAds = banners.filter((banner) => banner.type === 'desktop_billboard_middle');

const getRandomBanner = (adsArray: WidgetData[]) => {
  const randomIndex = Math.floor(Math.random() * adsArray.length);
  return adsArray[randomIndex]; // Return a random banner
}

const randomDesktopBillboardTopAd = getRandomBanner(desktopBillboardTopAds);
const randomDesktopBillboardMiddleAd = getRandomBanner(desktopBillboardMiddleAds);

    

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
    <div className="overflow-hidden">
      <Navbar headerItems={menuItems}></Navbar>
      <SocialNavbar></SocialNavbar>

      <div className="container mx-auto p-2">
        <Widget type='desktop_billboard_top' data={randomDesktopBillboardTopAd}></Widget>
         
          <main className =" grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">
              <div className="block lg:hidden col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
                <HomePageFeaturedPost post={featuredPost} categorySlug={featuredPost.categories.nodes[0].slug}></HomePageFeaturedPost>
                <div>
                <CategoryPostsList filteredPosts={filterByCategory("newsletter") || []} numberOfPosts={4} firstPostHasLargeImage={false}></CategoryPostsList>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
              <WidgetListSidebar data={sidebarAds}></WidgetListSidebar>

                <CategoryPostsList filteredPosts={filterByCategory("tech-news") || []} numberOfPosts={3} inlineTextOnDesktop showExtract={false}></CategoryPostsList>
              </div>

              <div className="col-span-1 hidden lg:block lg:col-span-6 border-l-2 border-r-2 border-gray-100 sm:p-2 ">
              <HomePageFeaturedPost post={featuredPost} categorySlug={featuredPost.categories.nodes[0].slug}></HomePageFeaturedPost>
              <div>
                <CategoryPostsList filteredPosts={filterByCategory("newsletter")} numberOfPosts={2} flexDirection="flex-row" firstPostHasLargeImage={false} ></CategoryPostsList>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
                <CategoryPostsList filteredPosts={filterByCategory("broker-news") || []} inlineTextOnDesktop numberOfPosts={3} showExtract={false}></CategoryPostsList>
                <WidgetListSidebar data={sidebarAds}></WidgetListSidebar>
              </div>

              <div className="col-span-1 sm:col-span-12">
              <Widget type="desktop_billboard_middle" data={randomDesktopBillboardMiddleAd}></Widget>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-9 sm:p-2 ">
                <CategoryPostsList filteredPosts={filterByCategory("institutional-trading") || []} numberOfPosts={3} flexDirection = 'flex-row' firstPostHasLargeImage></CategoryPostsList>
              </div>

              <div className=" col-span-1 lg:col-span-3 sm:p-2 ">
              <WidgetListSidebar data={sidebarAds}></WidgetListSidebar>

              </div>


              <div className="col-span-1  sm:col-span-12 lg:col-span-9  sm:p-2 lg:flex ">
                  <div className="col-span-1  sm:col-span-12 lg:col-span-6  sm:p-2 ">
                  <OneLargePost3SmallGrid filteredPosts={filterByCategory("interviews") || []} numberOfPosts={4} showExtract={false} ></OneLargePost3SmallGrid >
                  </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3   sm:p-2 ">
                <CategoryPostsList filteredPosts={filterByCategory("guest-posts") || []} numberOfPosts={2} showExtract={false}></CategoryPostsList>
              </div>

              <div className=" col-span-1 sm:col-span-12 lg:col-span-6  sm:p-2 ">
                <YouTubePlayer></YouTubePlayer>
              </div>

              <div className=" col-span-1 sm:col-span-12 lg:col-span-6 sm:p-2 ">
                <PodcastPlayer></PodcastPlayer>
              </div>
             
             <div className="col-span-1 sm:col-span-12 lg:col-span-9 sm:p-2 ">
                <CategoryPostsList filteredPosts={filterByCategory("start-a-broker") || []} numberOfPosts={3} flexDirection = 'flex-row'></CategoryPostsList>
                <CategoryPostsList filteredPosts={filterByCategory("start-a-broker") || []} offset={3} showCategoryTitle={false} numberOfPosts={3} flexDirection = 'flex-row'></CategoryPostsList>

                <div className="mt-4">
                <CategoryPostsList filteredPosts={filterByCategory("fx-cfd-liscensing") || []} numberOfPosts={4} flexDirection = 'flex-row'></CategoryPostsList>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
                <div className="col-span-1 sm:col-span-5 lg:col-span-3" ></div>
                <WidgetListSidebar data={sidebarAds}></WidgetListSidebar>
                <CategoryPostsList filteredPosts={filterByCategory("newsletter") || []} offset={3} numberOfPosts={3} showImage={false}></CategoryPostsList>
              </div>

       
          </main>
          </div>
          <Footer footerItems={footerMenuItems}></Footer>
      </div>
  </>
  );
}

