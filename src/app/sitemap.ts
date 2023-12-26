import { MetadataRoute } from 'next';
import { sql } from '@/context/func';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogsData = await sql(
    'SELECT b.slug, b."createdAt" FROM public.blogs as b'
  );

  const blogs = blogsData.map((blog: any) => {
    return {
      url: `https://blog-sync.vercel.app/blog/${blog.slug}`,
      lastModified: new Date(blog.createdAt),
    };
  });

  return [
    {
      url: 'https://blog-sync.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...blogs,
  ];
}
