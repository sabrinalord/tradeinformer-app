import { Post, PostsResponse, MenuResponse, MenuItem } from "@/app/types";
import { fetchCategories, fetchHeaderMenu, fetchPostsByCategory } from "../../lib/fetchData";
import Navbar from "@/app/components/Navbar";
import CategoryPostsList from "@/app/components/CategoryPostsList";
import Advert from "../components/Advert";
import CategoryFeaturedPost from "../components/CategoryFeaturedPost";

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
  const { category } = params;

  // Fetch menu data
  const headerMenuData: MenuResponse = await fetchHeaderMenu();
  const menuItems: MenuItem[] = headerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];

  // Fetch post data
  const categoryPosts = await fetchCategoryPosts(category);

  // fetch randomised category data for sidebar
  const categories: string[] = await fetchCategories();
  const filteredCategories = categories.filter(fetchedCatSlug => fetchedCatSlug !== category);

  const randomCatSlug = filteredCategories.length > 0 
    ? filteredCategories[Math.floor(Math.random() * filteredCategories.length)]
    : null;

  const randomCategoryPosts = randomCatSlug 
    ? await fetchCategoryPosts(randomCatSlug) 
    : [];

  return (
    <div className="overflow-hidden">
      <Navbar headerItems={menuItems} />

      <div className="container mx-auto sm:mx-8 md:mx-16 lg:mx-32">
        <Advert type="desktop_billboard_top" />
        <main className="grid grid-cols-1 sm:grid-cols-12 gap-4">

          <div className="col-span-1 sm:col-span-12 lg:col-span-9 p-2 sm:p-4">
            <div className="col-span-1 sm:col-span-12 lg:col-span-9 p-2 sm:p-4">
              <CategoryFeaturedPost post={categoryPosts[0]} />
            </div>

            <div className="col-span-1 sm:col-span-12 lg:col-span-9 p-2 sm:p-4">
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
            <CategoryPostsList filteredPosts={randomCategoryPosts} numberOfPosts={2} showExtract={false} showCategoryTitle />
          </div>
        </main>
      </div>
    </div>
  );
}
