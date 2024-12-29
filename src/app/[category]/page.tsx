import { Post, PostsResponse, CategoriesResponse, CategoryNode } from "@/app/types";
import { fetchCategories, fetchPageBySlug, fetchPostsByCategory } from "../../lib/fetchData";
import CategoryPostsList from "@/app/components/PostComponents/CategoryPostsList";
import Widget from "../components/Widget";
import CategoryFeaturedPost from "../components/PostComponents/CategoryFeaturedPost";
import RandomCategorySidebar from "../components/RandomCategorySidebar";

import styles from './Page.module.css';
import ContactForm from "../components/ContactForm";

export const revalidate = 10;
export const dynamicParams = true;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const fetchCategoryPosts = async (categorySlug: string): Promise<Post[]> => {
  const postsData: PostsResponse = await fetchPostsByCategory(categorySlug);
  return postsData?.data?.posts?.nodes ?? [];
};

const fetchStaticPageContent = async (slug: string) => {
  const pageData = await fetchPageBySlug(slug);
  return pageData?.data?.pageBy?.content ?? null;
};

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="overflow-hidden">
    <div className="container mx-auto p-2">
      <main className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">
        <div className=" hidden col-span-1 sm:block sm:col-span-12 lg:col-span-3 sm:p-2">
          <Widget type="sidebar" />
        </div>
        {children}
        <div className=" lg:hidden col-span-1 sm:block sm:col-span-12 sm:p-2">
          <Widget type="sidebar" />
        </div>
      </main>
    </div>
  </div>
);

export async function generateStaticParams() {
  const categoriesResponse: CategoriesResponse = await fetchCategories();
  const categories: CategoryNode[] = categoriesResponse?.data?.categories?.nodes || [];
  return categories.map((category) => ({ category: category.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const staticPageSlugs = ["what-is-tradeinformer", "about-us", "contact"];

  // Handle static pages
  if (staticPageSlugs.includes(category)) {
    const pageContent = await fetchStaticPageContent(category);

    if (!pageContent) {
      return <h1>Page not found</h1>;
    }

    return (
  

<Layout>
  <div className="col-span-1 sm:col-span-12 lg:col-span-6 sm:p-2">

  <div className={styles.content} dangerouslySetInnerHTML={{ __html: pageContent }} />

  </div>

    <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2">
    {category === "contact" && <ContactForm />}
    </div>
  </Layout>
    );
  }

  // Handle category posts
  const categoryPosts = await fetchCategoryPosts(category);

  return (
    <Layout>
    <div className="col-span-1 sm:col-span-12 lg:col-span-6 sm:p-2">

      <div className="mb-5 sm:mb-8">
        <CategoryFeaturedPost post={categoryPosts[0]} />
      </div>
    
      <div className="lg:mb-8">
        <CategoryPostsList
          filteredPosts={categoryPosts}
          numberOfPosts={3}
          showCategoryTitle={false}
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
        numberOfPosts={6}
        showCategoryTitle={false}
        offset={4}
        inlineTextOnDesktop
        hasPagination
      />
    </div>

      <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2">
        <RandomCategorySidebar alreadyDisplayedCategory={category} />
 
      </div>
    </Layout>
  );
}
