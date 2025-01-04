import { getAllTags } from "@/lib/utils";
import { posts } from "@site/content";
import { MetadataRoute } from "next";

const POSTS_PER_PAGE = 5;

const BASE_URL = "https://blog-sync.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all published posts
  const publishedPosts = posts.filter((post) => post.published);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE);

  // Get all tags
  const tags = getAllTags(posts);

  // Generate homepage and paginated URLs
  const paginatedUrls = Array.from({ length: totalPages }, (_, i) => ({
    url: `${BASE_URL}${i === 0 ? "/" : `?page=${i + 1}`}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as "daily",
    priority: i === 0 ? 1 : 0.8,
  }));

  // Generate post URLs
  const postUrls = publishedPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slugAsParams}`,
    lastModified: post.date,
    changeFrequency: "weekly" as "weekly",
    priority: 0.8, // Increase priority for blog posts
  }));

  // Generate tag URLs
  const tagUrls = Object.keys(tags).map((tag) => ({
    url: `${BASE_URL}/tags/${tag}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as "weekly",
    priority: 0.5,
  }));

  return [...paginatedUrls, ...postUrls, ...tagUrls];
}
