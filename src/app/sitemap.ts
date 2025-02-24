import { MetadataRoute } from "next";
import { fetchPosts } from "@/lib/fetchData";
import { PostsResponse, Post } from "@/app/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const postsData: PostsResponse = await fetchPosts();
    const posts: Post[] = postsData?.data?.posts?.nodes || [];

    const staticUrls: MetadataRoute.Sitemap = [
        { url: `${process.env.NEXT_PUBLIC_SITE_URL}/`, lastModified: new Date().toISOString() },
        { url: `${process.env.NEXT_PUBLIC_SITE_URL}/about-us`, lastModified: new Date().toISOString() },
        { url: `${process.env.NEXT_PUBLIC_SITE_URL}/what-is-tradeinformer`, lastModified: new Date().toISOString() },
        { url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`, lastModified: new Date().toISOString() },

    ];

    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${post.categories.nodes[0]?.slug}/${post.slug}`,
        lastModified: post.modified || new Date().toISOString(),
    }));

    return [...staticUrls, ...postUrls];
}
