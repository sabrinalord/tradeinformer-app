import { MetadataRoute } from "next";
import { fetchCategories, fetchPosts, fetchTags } from "@/lib/fetchData";
import { PostsResponse, Post, TagsResponse, TagNode, CategoriesResponse, CategoryNode } from "@/app/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const postsData: PostsResponse = await fetchPosts();
    const posts: Post[] = postsData?.data?.posts?.nodes || [];
    
    const tagsResponse: TagsResponse = await fetchTags();
    const tags: TagNode[] = tagsResponse?.data?.tags?.nodes || [];

    const categoryResponse: CategoriesResponse = await fetchCategories();
    const categories: CategoryNode[] = categoryResponse?.data?.categories?.nodes || [];

    const staticUrls: MetadataRoute.Sitemap = [
        { url: `${process.env.NEXT_PUBLIC_SITE_URL}/`, lastModified: new Date().toISOString().split('T')[0] },
        { url: `${process.env.NEXT_PUBLIC_SITE_URL}/about-us`, lastModified: new Date().toISOString().split('T')[0] },
        { url: `${process.env.NEXT_PUBLIC_SITE_URL}/what-is-tradeinformer`, lastModified: new Date().toISOString().split('T')[0] },
        { url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`, lastModified: new Date().toISOString().split('T')[0] },
    ];

    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${post.categories.nodes[0]?.slug}/${post.slug}`,
        lastModified: post.modified ? new Date(post.modified).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    }));

    const tagUrls: MetadataRoute.Sitemap = tags.map((tag) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/tag/${tag.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
    }));

    const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${category.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
    }));

    return [...staticUrls, ...postUrls, ...tagUrls, ...categoryUrls];
}
