
import { fetchCategories, fetchPostsByCategory } from "@/lib/fetchData";
import { CategoriesResponse, CategoryNode, Post, PostsResponse, } from "../types";
import CategoryPostsList from "./PostComponents/CategoryPostsList";

interface RandomCategorySidebarProps {
    alreadyDisplayedCategory?: string
}

const RandomCategorySidebar: React.FC<RandomCategorySidebarProps> = async (alreadyDisplayedCategory) => {

    const fetchCategoryPosts = async (categorySlug: string): Promise<Post[]> => {
        const postsData: PostsResponse = await fetchPostsByCategory(categorySlug);
        return postsData?.data?.posts?.nodes ?? [];
      };

      // fetch all the categories
      const categoriesData: CategoriesResponse = await fetchCategories();
    
      const categories: CategoryNode[] = categoriesData.data.categories.nodes;
    
      const filteredCategories = categories.filter(
        (category) => category.slug !== alreadyDisplayedCategory
      );

  const randomCategory = filteredCategories.length > 0 
    ? filteredCategories[Math.floor(Math.random() * filteredCategories.length)]
    : null;

  const randomCategoryPosts = randomCategory
    ? await fetchCategoryPosts(randomCategory.slug) 
    : [];


    return (
      <CategoryPostsList filteredPosts={randomCategoryPosts} numberOfPosts={6} firstPostHasLargeImage={false} showCategoryTitle inlineTextOnDesktop showExtract={false} />
    )

}


export default RandomCategorySidebar;