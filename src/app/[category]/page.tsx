import { Post, PostsResponse, CategoriesResponse, CategoryNode } from "@/app/types";
import { fetchCategories, fetchPostsByCategory } from "../../lib/fetchData";
import CategoryPostsList from "@/app/components/PostComponents/CategoryPostsList";
import Widget from "../components/Widget";
import CategoryFeaturedPost from "../components/PostComponents/CategoryFeaturedPost";
import RandomCategorySidebar from "../components/RandomCategorySidebar";
import { notFound } from "next/navigation";


export const dynamicParams = true;
const numberOfPostsInPaginatedSection = 15 

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

const fetchCategoryPosts = async (categorySlug: string): Promise<Post[]> => {
  try {
    const postsData: PostsResponse = await fetchPostsByCategory(categorySlug);
    return postsData?.data?.posts?.nodes ?? [];
  } catch (error) {
    console.error("Error fetching category posts:", error);
    return [];
  }
};


export async function generateStaticParams() { 
  const categoriesResponse: CategoriesResponse = await fetchCategories();
  const categories: CategoryNode[] = categoriesResponse?.data?.categories?.nodes || [];

  return categories.map((category) => ({
    category: category.slug,
    page: "1", 
  }));
}

const toTitleCase = (str: string) =>
  str
    .split("-") 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export async function generateMetadata({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt( resolvedSearchParams.page || "1");

  const categoryPosts = await fetchCategoryPosts(category);
  const totalPages = Math.ceil(categoryPosts.length / numberOfPostsInPaginatedSection);

  const prevPage =
    currentPage > 1 ? `/${category}?page=${currentPage - 1}` : null;
  const nextPage =
    currentPage < totalPages ? `/${category}?page=${currentPage + 1}` : null;

    const titleCategory = toTitleCase(category);


 

  return {
    title: `${titleCategory} |  Page ${currentPage} of ${totalPages}`,
    description: `Explore ${category} articles on page ${currentPage}`,
    alternates: {
      canonical: `/${category}${currentPage > 1 ? `?page=${currentPage}` : ""}`,
    },
    openGraph: {
      title: `${titleCategory} |  Page ${currentPage} of ${totalPages}`,
      url: `/${category}?page=${currentPage}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...(prevPage ? { prev: prevPage } : {}),
    ...(nextPage ? { next: nextPage } : {}),
  };
}

export default async function CategoryPage({ params, searchParams}: CategoryPageProps)  {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt( resolvedSearchParams.page || "1");



  const categoryPosts = await fetchCategoryPosts(category);
  if (categoryPosts.length === 0) {
    return (
      notFound()
    );
  }


  return (
    <div className="overflow-hidden">
    <div className="container mx-auto p-2">
      <main className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">
      <div className="hidden col-span-1 lg:block sm:col-span-12 lg:col-span-3 sm:p-2">
      <Widget type="sidebar" />
    </div>
    <div className="col-span-1 sm:col-span-12 lg:col-span-6 sm:p-2">
      <div className="mb-5 sm:mb-8">
        <CategoryFeaturedPost post={categoryPosts[0]} />
      </div>
      <div className="lg:mb-8">
        <CategoryPostsList
          currentPage = {currentPage }
          filteredPosts={categoryPosts}
          numberOfPosts={3}
          showCategoryTitle={false}
          categorySlug={category}
          firstPostHasLargeImage={false}
          flexDirection="flex-row"
          showExtract={false}
          offset={1}
        />
      </div>
      <div className="lg:hidden max-w-[500px] ml-auto mr-auto">
        <Widget type="sidebar" />
      </div>
      <CategoryPostsList
        filteredPosts={categoryPosts}
        firstPostHasLargeImage={false}
        categorySlug={category}
        currentPage = {currentPage}
        numberOfPosts={numberOfPostsInPaginatedSection}
        showCategoryTitle={false}
        offset={4}
        inlineTextOnDesktop
        hasPagination
      />
    </div>
    <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2">
      <RandomCategorySidebar alreadyDisplayedCategory={category} />
    </div>


      </main>
    </div>
  </div>
  );
}
