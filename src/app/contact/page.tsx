import { fetchPageBySlug } from "@/lib/fetchData";
import styles from "../[category]/Page.module.css";
import ContactForm from "../components/ContactForm";


export const revalidate = 10;

const fetchStaticPageContent = async (slug: string): Promise<string | null> => {
  try {
    const pageData = await fetchPageBySlug(slug);
    return pageData?.data?.pageBy?.content ?? null;
  } catch (error) {
    console.error("Error fetching static page content:", error);
    return null;
  }
};

export default async function ContactPage() {
  const pageContent = await fetchStaticPageContent("contact");

  if (!pageContent) {
    return <h1>Content not available at the moment. Please try again later.</h1>;
  }

  return (  

<div className="overflow-hidden">
    <div className="container mx-auto p-2">
      <main className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">
        <div className="col-span-1 sm:col-span-12 lg:col-span-1 sm:p-2 mt-10"></div>
          <div className="col-span-1 sm:col-span-12 lg:col-span-6 sm:p-2">
              <div className={styles.content} dangerouslySetInnerHTML={{ __html: pageContent }} />
          </div>
          <div className="col-span-1 sm:col-span-12 lg:col-span-4 sm:p-2 mt-10">
              <ContactForm />
          </div>
       <div className="col-span-1 sm:col-span-12 lg:col-span-1 sm:p-2 mt-10"></div>
      </main>
    </div>
  </div>
  );
}
