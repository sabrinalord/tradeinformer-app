import { Post, PostsResponse, MenuResponse, MenuItem, CategoriesResponse, CategoryNode } from "@/app/types";
import { fetchCategories, fetchFooterMenu, fetchHeaderMenu, fetchPostsByCategory } from "../../lib/fetchData";
import Navbar from "@/app/components/Navbar";
import CategoryPostsList from "@/app/components/PostComponents/CategoryPostsList";
import Widget from "../components/Widget";
import CategoryFeaturedPost from "../components/PostComponents/CategoryFeaturedPost";
import RandomCategorySidebar from "../components/RandomCategorySidebar";
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
    <div className="overflow-hidden">
      <Navbar headerItems={menuItems}></Navbar>
      <SocialNavbar></SocialNavbar>
      <div className="container mx-auto p-2">
        <Widget type="desktop_billboard_top"></Widget>
          <main className =" grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">

          <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
              <Widget type='sidebar'></Widget>
           </div>


            <div className="col-span-1 sm:col-span-12 lg:col-span-6 p-2 sm:p-2">
              
              <div className="mb-5 sm:mb-8 lg:mb-10">
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
                hasLoadMore={true}
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
