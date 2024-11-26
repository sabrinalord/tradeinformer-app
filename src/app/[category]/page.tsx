import { Post, PostsResponse, MenuResponse, MenuItem} from "@/app/types";
import {fetchHeaderMenu, fetchPostsByCategory } from "../../lib/fetchData"
import Navbar from "@/app/components/Navbar";
import CategorySection from "@/app/components/CategorySection";
import Advert from "../components/Advert";
import CategoryFeaturedPost from "../components/CategoryFeaturedPost";


export const revalidate = 10;
export const dynamicParams = true;



interface CategoryPageProps {
    params: {
      category: string;
    };
  }

export default async function CategoryPage({ params }: CategoryPageProps) {

    const headerMenuData: MenuResponse = await fetchHeaderMenu();
    const menuItems: MenuItem[] = headerMenuData?.data?.menuItems.edges.map(edge => edge.node) || [];
    const { category } = params;


    const categoryPostsData: PostsResponse  = await fetchPostsByCategory(category);
    const  categoryPosts: Post[] = categoryPostsData?.data?.posts?.nodes ?? [];



    return (
        <div className="overflow-hidden">
        <Navbar headerItems={menuItems}></Navbar>

        <div className="container mx-auto sm:mx-8 md:mx-16 lg:mx-32">
        <Advert type="desktop_billboard_top"></Advert>
            <main className =" grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="col-span-1  sm:col-span-12 lg:col-span-9  p-2 sm:p-4 lg:flex ">
                  <div className="col-span-1  sm:col-span-12 lg:col-span-9  p-2 sm:p-4 ">
                  < CategoryFeaturedPost post={categoryPosts[0]} ></CategoryFeaturedPost>
                  </div>

                  <div className="col-span-1  sm:col-span-12 lg:col-span-9  p-2 sm:p-4 ">
                  <CategorySection filteredPosts={categoryPosts} numberOfPosts={3} showCategoryTitle={false} offset={1}  ></CategorySection>
                  </div>
              </div>

            <div className="sm:col-span-3  p-2 sm:p-4 ">
                <CategorySection filteredPosts={categoryPosts} numberOfPosts={2} showExtract={false}></CategorySection>
              </div>
            </main>
        </div>
        </div>
    )
  }
