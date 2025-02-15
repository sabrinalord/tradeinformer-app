import { fetchPageBySlug } from "@/lib/fetchData";
import styles from "../[category]/Page.module.css";
import Image from 'next/image';



const fetchStaticPageContent = async (slug: string): Promise<string | null> => {
  try {
    const pageData = await fetchPageBySlug(slug);
    return pageData?.data?.pageBy?.content ?? null;
  } catch (error) {
    console.error("Error fetching static page content:", error);
    return null;
  }
};

export default async function AboutUsPage() {
  const pageContent = await fetchStaticPageContent("about-us");

  if (!pageContent) {
    return <h1>Content not available at the moment. Please try again later.</h1>;
  }

  return (  
    <div className="overflow-hidden">
      <div className="container mx-auto p-2">
        <main className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">
          <div className="col-span-1 sm:col-span-12 lg:col-span-1 sm:p-2 mt-10"></div>
          <div className="col-span-1 sm:col-span-12 lg:col-span-10 sm:p-2">
            
            {/* Flex container for side-by-side layout */}
            <div className="flex flex-col md:flex-row items-start gap-4 items-center mb-20">
              <div className={styles.content} dangerouslySetInnerHTML={{ __html: pageContent }} />
              
              <Image
                className="w-auto h-auto"
                src="/images/DavidKimberley.png"
                width={300}
                height={300}
                alt="David Kimberley"
              />
            </div>
  
          </div>
        </main>
      </div>
    </div>
  );
  
}
