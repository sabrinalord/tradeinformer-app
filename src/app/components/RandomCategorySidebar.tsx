
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
        (category) => category.slug !== alreadyDisplayedCategory && category.slug !== 'featured' 
      );

  const randomCategoryNode =  filteredCategories[Math.floor(Math.random() * filteredCategories.length)]
  const randomCategory = randomCategoryNode ? randomCategoryNode.slug : "newsletters"
  const randomCategoryPosts = randomCategory 
    ? await fetchCategoryPosts(randomCategory) 
    : [];


    return (
      <CategoryPostsList filteredPosts={randomCategoryPosts} numberOfPosts={6} firstPostHasLargeImage={false} showCategoryTitle inlineTextOnDesktop showExtract={false} categorySlug={randomCategory} />
    )

}


export default RandomCategorySidebar;