import { Post, PostsResponse, MenuResponse, MenuItem, CategoriesResponse, CategoryNode } from "@/app/types";
import { fetchCategories, fetchFooterMenu, fetchHeaderMenu, fetchPostsByCategory } from "../../lib/fetchData";
import Navbar from "@/app/components/Navbar";
import CategoryPostsList from "@/app/components/CategoryPostsList";
import Advert from "../components/Advert";
import CategoryFeaturedPost from "../components/PostComponents/CategoryFeaturedPost";
import RandomCategorySidebar from "../components/RandomCategorySidebar";
import { NewsletterSignUp } from "../components/NewsletterSignUp";
import SocialNavbar from "../components/SocialNavbar";
import Footer from "../components/Footer";

export const revalidate = 10;
export const dynamicParams = true;

interface CategoryPageProps {
  params:Promise<{
    category: string;
  }>;
}


export async function generateStaticParams() {
  const categoriesResponse: CategoriesResponse = await fetchCategories();
  const categories: CategoryNode[] = categoriesResponse?.data?.categories?.nodes || [];

  return categories.map((category) => ({
    category: category.slug,
  }));
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


  const footerMenuData: MenuResponse = await fetchFooterMenu();
  const footerMenuItems: MenuItem[] = footerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];
  

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
              <div className="lg:mb-6">
              <CategoryFeaturedPost post={categoryPosts[0]} />
              </div>

              <div>
                <div  className="lg:mb-10">
                <CategoryPostsList 
                filteredPosts={categoryPosts} 
                numberOfPosts={3} 
                showCategoryTitle={false} 
                firstPostHasLargeImage = {false}
                flexDirection={"flex-row"}
                offset={1} 
                />
                </div>
             
                <CategoryPostsList 
                filteredPosts={categoryPosts} 
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
              <RandomCategorySidebar alreadyDisplayedCategory={category}></RandomCategorySidebar>
              </div>
    </main>
      </div>
      <Footer footerItems={footerMenuItems}></Footer>
    </div>
    </>
  );
}
