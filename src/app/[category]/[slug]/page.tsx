import { Post, SinglePostResponse, PostsResponse} from "@/app/types";
import {fetchPostBySlug, fetchPostsWithLimit} from "../../../lib/fetchData"
import { formatDate } from "../../../lib/dateFormatter";
import Widget from "@/app/components/Widget";
import Image from 'next/image';
import styles from '../Page.module.css';
import RandomCategorySidebar from "@/app/components/RandomCategorySidebar";

import Link from "next/link";
import SocialShareForArticles from "@/app/components/SocialShareForArticles";
import { Metadata } from "next";


export const dynamicParams = true;


// below function is needed for static generation of post paths at build time
export async function generateStaticParams() {
    const postsData: PostsResponse = await fetchPostsWithLimit();
    const posts: Post[] = postsData?.data?.posts?.nodes || [];

    return posts
    .map((post) => {
        if (!post.categories?.nodes?.[0]?.slug) {
            console.error("Post missing category slug:", JSON.stringify(post, null, 2));
            return null; 
        }
        return {
            category: post.categories.nodes[0].slug,
            slug: post.slug,
        };
    })
    .filter((entry) => entry !== null)
}

    // when formatting content on wordpress, classes are not recognised outside of WP so adding formatting here
function processContent(content: string): string {
  return content.replace(/class="([^"]*?(has-text-align-center|aligncenter|wp-block-heading)[^"]*?)"/g, (match, classes) => {
    let style = '';

    if (/\bhas-text-align-center\b/.test(classes)) {
      style += 'text-align: center;';
    }

    if (/\baligncenter\b/.test(classes)) {
      style += 'display: flex; flex-direction: column; align-items: center;';
    }

    if (/\bwp-block-heading\b/.test(classes)) {
      style += 'font-weight: bold; font-size: 1em;';
    }

    return `class="${classes}" style="${style}"`;
  });
}


  export async function generateMetadata({
    params
  }: {
    params: Promise<{ slug: string, category:string }>  
  }): Promise<Metadata> {
    const { slug, category } = await params;
  
    try {
      const postData: SinglePostResponse = await fetchPostBySlug(slug);
  
      if (!postData || !postData.data?.postBy) {
        return {
          title: "TradeInformer - Article Not Found",
          description: "Article not found or has been removed.",
        };
      }
  
      const post = postData.data.postBy;
  
      return {
        title: `${post.title}`, 
        description: post.excerpt || "TradeInformer is the leading website for forex broker, CFD and retail trading industry news, providing in-depth analysis, research, interviews, and more.",
        openGraph: {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}/${slug}`,
          title: `${post.title}`,
          description: post.excerpt.replace(/<[^>]*>?/gm, ""),
          images: [
            {
              url: post.featuredImage?.node?.sourceUrl,
              width: 800,
              height: 800,
              alt: post.featuredImage?.node?.altText || "Featured Image",
            },
          ],
          type: "article",
        },
        twitter: {
          card: "summary_large_image",
          title: `${post.title}`,
          description: post.excerpt || "TradeInformer is the leading website for forex broker, CFD and retail trading industry news, providing in-depth analysis, research, interviews, and more.",
          images: [post.featuredImage?.node?.sourceUrl ],
        },
      };
    } catch (error) {
      console.error(`Error fetching metadata for slug: ${slug}`, error);
      return {
        title: "TradeInformer - Error",
        description: "Something went wrong while fetching the article.",
      };
    }
  }


export default async function Page({
    params,
  }: {
    params: Promise<{category: string, slug: string  }>;
  }) {
    const { category, slug } = await params;

    try {
        const postData: SinglePostResponse  = await fetchPostBySlug(slug);
        if (!postData || !postData.data?.postBy) {
            console.error(`Post not found for slug: ${slug}`);
            throw new Error("Post not found");
          }
          const post: Post = postData?.data?.postBy || [];
          const formattedDate = formatDate(post.date);
          const categoryName = post.categories.nodes[0]?.name || "Category";
          const processedContent = processContent(post.content);

      
          return (
            <div className="overflow-hidden">
          
            <div className="container mx-auto p-2">
                <main className ="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">
                   
                    <div className="hidden lg:block col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
                    <Widget type="sidebar"></Widget>
                    </div>
                        
                <article className="col-span-1 sm:col-span-12 lg:col-span-6 sm:p-2 ">
                    <div className="">
                       <Link className={styles.link} href={`/${category}`}>{categoryName}</Link> 
                       <div className="flex justify-between">
                        <h1 className="font-bold text-xl lg:text-[1.6em] ">{post.title}</h1>
    
                       </div>
                        <div className="border-b mt-2 sm:mb-2"></div>
    
                        <div className="flex justify-between mt-2 mb-2">
                            <div className="text-xs">
                                <p >By <strong>{post.author.node.name}</strong></p>
                                <p>{formattedDate}</p>
                            </div>
                            <SocialShareForArticles articleTitle={post.title}></SocialShareForArticles>
    
                        </div>
                    </div>
                    <Image className="lg:p-6 ml-auto mr-auto"
                                  src={post.featuredImage.node.sourceUrl} 
                                  width="800"
                                  height="800" 
                                  alt={post.featuredImage.node.altText || 'Featured Image'} >
                        </Image> 
        
                    <div className={` ${styles.content} mt-4`} dangerouslySetInnerHTML={{ __html: processedContent  }}></div>
                    
                    {post.tags.nodes.length > 0 && (
                        <div>
                            <ul className="flex flex-wrap text-sm">
                                <li className="inline-fle p-2 m-2 bg-[#266fef] text-white uppercase">
                                Tags
                                </li>
                                {post.tags.nodes.map((tag) => (
                                    <li key={tag.uri} className="inline-flex">
                                    <Link className="p-2 m-2 border  hover:bg-gray-100" href={tag.uri}>
                                        {tag.name}
                                    </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        )}
    
                </article>
    
                <div className="lg:hidden col-span-1 sm:col-span-6 lg:col-span-3 sm:p-2 ">
                    <Widget type="sidebar"></Widget>
                    </div>
                 
    
                <div className="col-span-1 sm:col-span-12 lg:col-span-3 sm:p-2 ">
                  <RandomCategorySidebar></RandomCategorySidebar>
                 </div>
                </main>
            </div>
    
            </div>
        )

    } catch(error) {
        console.error(`Error fetching post: ${slug}`, error);
        return ( 
        <div className="overflow-hidden">
            <div className="container mx-auto p-2">
              <main className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-4">
                <div className="hidden col-span-1 lg:block sm:col-span-12 lg:col-span-3 sm:p-2">
                <Widget type="sidebar" />
               </div>
                <div className="col-span-1 sm:col-span-12 lg:col-span-6 sm:p-2">
                <div className="text-center flex flex-col items-center justify-center">
                <Image src="/images/404Robot.jpg" alt="404 Page error" width="300" height="300" />
                    <p className="text-gray-500 mt-4">
                      Sorry, the page or content you are looking for may have been moved or we might be experiencing a technical glitch.
                    </p>
                    <p className="text-gray-500 mt-4 mb-10">
                    Please try again later or check the URL that you are trying to access.</p>
                  </div>
            
              <div className="lg:hidden max-w-[500px] ml-auto mr-auto">
                <Widget type="sidebar" />
              </div>
            
            </div>
        
              </main>
            </div>
          </div>
          )
    }
}




