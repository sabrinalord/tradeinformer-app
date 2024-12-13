import { Post, PostsResponse, MenuResponse, MenuItem, TagsResponse, TagNode } from "@/app/types";
import { fetchFooterMenu, fetchHeaderMenu, fetchTags } from "../../../lib/fetchData";
import Navbar from "@/app/components/Navbar";
import CategoryPostsList from "@/app/components/PostComponents/CategoryPostsList";
import Advert from "../../components/Advert";
import CategoryFeaturedPost from "../../components/PostComponents/CategoryFeaturedPost";
import RandomCategorySidebar from "../../components/RandomCategorySidebar";
import SocialNavbar from "../../components/SocialNavbar";
import Footer from "../../components/Footer";
import { fetchPostsByTag } from "@/lib/fetchData";
import CategoryHeader from "@/app/components/CategoryHeader";

export const revalidate = 10;
export const dynamicParams = true;

interface TagPageProps {
  params:Promise<{
    tagSlug: string;
    tagName: string
  }>;
}


export async function generateStaticParams() {
  const tagsResponse: TagsResponse = await fetchTags();
  const tags: TagNode[] = tagsResponse?.data?.tags?.nodes || [];

  return tags.map((tag) => ({
    tagSlug: tag.slug
  }));
}

const fetchTagPosts = async (tagSlug: string): Promise<Post[]> => {
  const postsData: PostsResponse = await fetchPostsByTag(tagSlug);
  return postsData?.data?.posts?.nodes ?? [];
};



export default async function TagPage({ params }: TagPageProps) {
  const { tagSlug} = await params;

  // Fetch menu data
  const headerMenuData: MenuResponse = await fetchHeaderMenu();
  const menuItems: MenuItem[] = headerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];

  const footerMenuData: MenuResponse = await fetchFooterMenu();
  const footerMenuItems: MenuItem[] = footerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];
  

  // Fetch post data
  const tagPosts = await fetchTagPosts(tagSlug);
  const tagName = tagPosts?.[0]?.tags?.nodes?.find((tag) => tag.slug === tagSlug)?.name || "Unknown Tag";

  return (
    <>

    <div className="overflow-hidden">
      <Navbar headerItems={menuItems}></Navbar>
    
      <SocialNavbar></SocialNavbar>
      <div className="container mx-auto p-2">
        <Advert type="desktop_billboard_top"></Advert>
          <main className =" grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
           
            <div className="col-span-1 sm:col-span-12 lg:col-span-9 p-2 sm:p-4">
                <CategoryHeader categoryName={`Tagged as: ${tagName}`}></CategoryHeader>
              
              <div className="mb-5 sm:mb-8 lg:mb-10">
              <CategoryFeaturedPost showCategoryHeader={false}  post={tagPosts[0]} />
              </div>

              <div>
                <div className="lg:mb-10">
                <CategoryPostsList 
                filteredPosts={tagPosts} 
                numberOfPosts={3} 
                showCategoryTitle={false} 
                firstPostHasLargeImage = {false}
                flexDirection={"flex-row"}
                offset={1} 
                />
                </div>
             
                <CategoryPostsList 
                filteredPosts={tagPosts} 
                firstPostHasLargeImage={false}
                numberOfPosts={6} 
                showCategoryTitle={false} 
                offset={4} 
                inlineTextOnDesktop
                />
              </div>
            </div>
             

              {/* Sidebar Content (Random Category Posts) */}
              <div className="sm:col-span-3 p-2 sm:p-4">
              <RandomCategorySidebar alreadyDisplayedCategory={"guest-posts"}></RandomCategorySidebar>
              </div>
    </main>
      </div>
      <Footer footerItems={footerMenuItems}></Footer>
    </div>
    </>
  );
}
