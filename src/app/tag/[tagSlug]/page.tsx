import { Post, PostsResponse, TagsResponse, TagNode } from "@/app/types";
import { fetchTags } from "../../../lib/fetchData";
import CategoryPostsList from "@/app/components/PostComponents/CategoryPostsList";
import CategoryFeaturedPost from "../../components/PostComponents/CategoryFeaturedPost";
import RandomCategorySidebar from "../../components/RandomCategorySidebar";

import { fetchPostsByTag } from "@/lib/fetchData";
import CategoryHeader from "@/app/components/CategoryHeader";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamicParams = true;

interface TagPageProps {
  params:Promise<{
    tagSlug: string;
    tagName: string
  }>;
}


export async function generateStaticParams() {
  const tagsResponse: TagsResponse = await fetchTags();
  const tags: TagNode[] = tagsResponse?.data.tags?.nodes || [];

  return tags.map((tag) => ({
    tagSlug: tag.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ tagSlug: string}>  
}): Promise<Metadata> {
  const { tagSlug } = await params;
  try {
    const tagPosts: Post[] = await fetchTagPosts(tagSlug);

    if (!tagPosts || tagPosts.length === 0) {
      return {
        title: "TradeInformer - Tag Not Found",
        description: "Tag not found or has been removed.",
      };
    }

    const tagName = tagPosts[0]?.tags?.nodes?.find((tag) => tag.slug === tagSlug)?.name || "Unknown Tag";

    return {
      title: `Tagged: ${tagName} | TradeInformer`,
      description: `Explore the latest articles tagged with ${tagName} on TradeInformer.`,
      openGraph: {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/tag/${tagSlug}`,
        title: `Tagged: ${tagName} | TradeInformer`,
        description: `Discover articles tagged under ${tagName} on TradeInformer.`,
        images: tagPosts[0]?.featuredImage?.node?.sourceUrl
        ? [
            {
              url: tagPosts[0].featuredImage.node.sourceUrl,
              width: 800,
              height: 800,
              alt: tagPosts[0].featuredImage.node.altText || "Featured Image",
            },
          ]
        : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `Tagged: ${tagName} | TradeInformer`,
        description: `Discover articles tagged under ${tagName} on TradeInformer.`,
        images: tagPosts[0]?.featuredImage?.node?.sourceUrl
          ? [tagPosts[0].featuredImage.node.sourceUrl]
          : [],
      },
    };
  } catch (error) {
    console.error(`Error fetching metadata for tag: ${tagSlug}`, error);
    return {
      title: "TradeInformer - Error",
      description: "Something went wrong while fetching tag data.",
    };
}
}


const fetchTagPosts = async (tagSlug: string): Promise<Post[]> => {
  const postsData: PostsResponse = await fetchPostsByTag(tagSlug);
  if (!postsData) {
    notFound()
  }

  return postsData?.data?.posts?.nodes ?? [];
};



export default async function TagPage({ params }: TagPageProps) {
  const { tagSlug} = await params;

  const tagPosts = await fetchTagPosts(tagSlug);

  const tagName = tagPosts?.[0]?.tags?.nodes?.find((tag) => tag.slug === tagSlug)?.name || "Unknown Tag";

  return (
    <>

    <div className="overflow-hidden">

      <div className="container mx-auto p-2">
          <main className =" grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
           
            <div className="col-span-1 sm:col-span-12 lg:col-span-9 p-2 sm:p-4">
                <CategoryHeader categoryName={`Tagged as: ${tagName}`}></CategoryHeader>
              
              <div className="mb-5 sm:mb-8 lg:mb-10">
              <CategoryFeaturedPost showCategoryHeader={false}  post={tagPosts[0]} />
              </div>

              <div>
                <div className="lg:mb-10">
                <CategoryPostsList 
                filteredPosts={tagPosts} 
                numberOfPosts={3} 
                showCategoryTitle={false} 
                firstPostHasLargeImage = {false}
                flexDirection={"flex-row"}
                offset={1} 
                />
                </div>
             
                <CategoryPostsList 
                filteredPosts={tagPosts} 
                firstPostHasLargeImage={false}
                numberOfPosts={6} 
                showCategoryTitle={false} 
                offset={4} 
                inlineTextOnDesktop
                />
              </div>
            </div>
             

              {/* Sidebar Content (Random Category Posts) */}
              <div className="sm:col-span-3 p-2 sm:p-4">
              <RandomCategorySidebar alreadyDisplayedCategory={"guest-posts"}></RandomCategorySidebar>
              </div>
    </main>
      </div>
    </div>
    </>
  );
}
