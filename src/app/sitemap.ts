import { MetadataRoute } from "next";
import { fetchPosts } from "@/lib/fetchData";
import { PostsResponse, Post } from "@/app/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) {
        throw new Error("NEXT_PUBLIC_SITE_URL is not defined in environment variables");
    }

    const postsData: PostsResponse = await fetchPosts();
    const posts: Post[] = postsData?.data?.posts?.nodes || [];

    const staticUrls: MetadataRoute.Sitemap = [
        { url: `${siteUrl}/`, lastModified: new Date().toISOString() },
        { url: `${siteUrl}/about-us`, lastModified: new Date().toISOString() },
        { url: `${siteUrl}/what-is-tradeinformer`, lastModified: new Date().toISOString() },
        { url: `${siteUrl}/contact`, lastModified: new Date().toISOString() },

    ];

    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${siteUrl}/${post.categories.nodes[0]?.slug}/${post.slug}`,
        lastModified: post.modified || new Date().toISOString(),
    }));

    return [...staticUrls, ...postUrls];
}
