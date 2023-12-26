import Hemder from '@/components/Hemder';
import SIngleBlog from '@/components/SIngleBlog';
import { sql } from '@/context/func';

export const getAllBlogs = async () => {
  return await sql(
    'SELECT b.id, b.title, b.description, b.author, b.slug, b."createdAt" FROM public.blogs as b'
  );
}

const getBlogsData = async () => {
  try {
    await sql`CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      title TEXT,
      content TEXT,
      description TEXT,
      slug TEXT,
      author TEXT,
      "authorId" TEXT,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    const response = await getAllBlogs()

    return response;
  } catch (error) {
    console.error('Error retrieving notes data:', error);
    return [];
  }
};
export default async function Home() {
  const blogsData = await getBlogsData();
  return (
    <section>
      <Hemder blogsData={JSON.stringify(blogsData)} />
      <div className="p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-sm leading-6">
        {blogsData.length ? (
          blogsData?.map((blog: any) => (
            <SIngleBlog blog={blog} key={blog.id} />
          ))
        ) : (
          <h4>No blogs</h4>
        )}
      </div>
    </section>
  );
}
