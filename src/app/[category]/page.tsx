import { Post, PostsResponse, MenuResponse, MenuItem } from "@/app/types";
import { fetchHeaderMenu, fetchPostsByCategory } from "../../lib/fetchData";
import Navbar from "@/app/components/Navbar";
import CategoryPostsList from "@/app/components/CategoryPostsList";
import Advert from "../components/Advert";
import CategoryFeaturedPost from "../components/CategoryFeaturedPost";
import RandomCategorySidebar from "../components/RandomCategorySidebar";
import { NewsletterSignUp } from "../components/NewsletterSignUp";
import SocialNavbar from "../components/SocialNavbar";

export const revalidate = 10;
export const dynamicParams = true;

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const fetchCategoryPosts = async (categorySlug: string): Promise<Post[]> => {
  const postsData: PostsResponse = await fetchPostsByCategory(categorySlug);
  return postsData?.data?.posts?.nodes ?? [];
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Fetch menu data
  const headerMenuData: MenuResponse = await fetchHeaderMenu();
  const menuItems: MenuItem[] = headerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];

  // Fetch post data
  const categoryPosts = await fetchCategoryPosts(category);


  return (
    <>
    <NewsletterSignUp></NewsletterSignUp>
    <div className="overflow-hidden">
      <Navbar headerItems={menuItems}></Navbar>
      <SocialNavbar></SocialNavbar>
      <div className="container mx-auto">
        <Advert type="desktop_billboard_top"></Advert>
          <main className =" grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
            <div className="col-span-1 sm:col-span-12 lg:col-span-9 p-2 sm:p-4">
            <div>
            <CategoryFeaturedPost post={categoryPosts[0]} />
            </div>
            <div>
                <CategoryPostsList 
                filteredPosts={categoryPosts} 
                numberOfPosts={3} 
                showCategoryTitle={false} 
                flexDirection={"flex-row"}
                offset={1} 
                />
                <CategoryPostsList 
                filteredPosts={categoryPosts} 
                firstPostHasLargeImage={false}
                numberOfPosts={6} 
                showCategoryTitle={false} 
                offset={4} 
                />
              </div>
            </div>
             

              {/* Sidebar Content (Random Category Posts) */}
              <div className="sm:col-span-3 p-2 sm:p-4">
              <RandomCategorySidebar alreadyDisplayedCategory={category}></RandomCategorySidebar>
              </div>
    </main>
      </div>
    </div>
    </>
  );
}
