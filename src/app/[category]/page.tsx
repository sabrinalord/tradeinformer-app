import { Post, PostsResponse, CategoriesResponse, CategoryNode } from "@/app/types";
import { fetchCategories, fetchPageBySlug, fetchPostsByCategory } from "../../lib/fetchData";
import CategoryPostsList from "@/app/components/PostComponents/CategoryPostsList";
import Widget from "../components/Widget";
import CategoryFeaturedPost from "../components/PostComponents/CategoryFeaturedPost";
import RandomCategorySidebar from "../components/RandomCategorySidebar";

import styles from './Page.module.css';


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

  const staticPageSlugs = ["what-is-tradeinformer", "about-us", "contact"];

  if (staticPageSlugs.includes(category)) {

    const pageData = await fetchPageBySlug(category);
    const pageContent = pageData
    console.log('page content is', pageContent)

    if (!pageContent) {
      return (
        <div>
          <h1>Page not found</h1>
        </div>
      );
    }

    // Render page content for static slugs
    return (
      <>
        <div className="overflow-hidden">
          <div className="container mx-auto p-2">
            <Widget type="desktop_billboard_top"></Widget>
            <main className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">
              <div className="hidden lg:block col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2">
                <Widget type="sidebar"></Widget>
              </div>
              <div className="col-span-1 sm:col-span-12 lg:col-span-6 p-2 sm:p-2">

                <div className={` ${styles.content}`} dangerouslySetInnerHTML={{ __html: pageContent.data.pageBy.content }} />
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }

  // Fetch post data
  const categoryPosts = await fetchCategoryPosts(category);

  return (
    <>
    <div className="overflow-hidden">

      <div className="container mx-auto p-2">
        <Widget type="desktop_billboard_top"></Widget>
          <main className =" grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">

          <div className="hidden lg:block col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
              <Widget type='sidebar'></Widget>
           </div>


            <div className="col-span-1 sm:col-span-12 lg:col-span-6 p-2 sm:p-2">
              
              <div className="mb-5 sm:mb-8">
              <CategoryFeaturedPost post={categoryPosts[0]} />
              </div>

              <div>
                <div  className="lg:mb-8">
                <CategoryPostsList 
                filteredPosts={categoryPosts} 
                numberOfPosts={3} 
                showCategoryTitle={false} 
                firstPostHasLargeImage = {false}
                flexDirection={"flex-row"}
                showExtract={false}
                offset={1} 
                />
                </div>

                <div className = "lg:hidden max-w-[500px] ml-auto mr-auto">
                <Widget type='sidebar'></Widget>
                </div>
             
                <CategoryPostsList 
                filteredPosts={categoryPosts} 
                firstPostHasLargeImage={false}
                numberOfPosts={6} 
                showCategoryTitle={false} 
                offset={4} 
                inlineTextOnDesktop
                hasPagination
                />
              </div>
            </div>
             

              {/* Sidebar Content (Random Category Posts) */}
              
              <div className="hidden lg:block lg:col-span-3 sm:p-2">
              <RandomCategorySidebar alreadyDisplayedCategory={category}></RandomCategorySidebar>
              </div>
    </main>
      </div>
    </div>
    </>
  );
}
