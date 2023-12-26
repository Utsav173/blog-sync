export const dynamic = 'force-static';

import dynamicImport from 'next/dynamic';
import { Parser } from 'html-to-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Metadata } from 'next';
import { neon } from '@neondatabase/serverless';
import { AiOutlineEdit } from 'react-icons/ai';
import { Suspense } from 'react';

const CommentSec = dynamicImport(() => import('@/components/CommentSec'));
const DeleteComp = dynamicImport(() => import('@/components/DeleteComp'));

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL as string);

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const blogData = await sql(
    'SELECT b.title, b.description FROM blogs as b WHERE b.slug = $1',
    [params.id]
  );

  if (blogData.length === 0) {
    return {
      title: 'Blog Not Found',
    };
  } else {
    return {
      title: blogData[0].title,
      description: blogData[0].description.slice(0, 40),
    };
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const blogData = await sql('SELECT * FROM blogs WHERE slug = $1', [id]);

  if (blogData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-[#282828] font-semibold">
          🔍 Blog Not Found
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="py-10 px-6 max-sm:px-3 pt-0" suppressHydrationWarning>
        <div className="porse max-w-5xl mx-auto">
          <div className="flex py-5 bg-blend-saturation items-center justify-between mb-6 bleedBg">
            <h1 className="text-3xl font-bold">{blogData[0]?.title}</h1>
            <div className="flex gap-2">
              {cookies().get('userId')?.value == blogData[0]?.authorId && (
                <>
                  <Link
                    href={`/blog/edit/${blogData[0].id}`}
                    className="text-[#5d95ff] hover:text-[#0389ff]"
                  >
                    <AiOutlineEdit className="h-5 w-5" />
                  </Link>
                  <DeleteComp
                    id={blogData[0].id}
                    authorId={blogData[0]?.authorId}
                  />
                </>
              )}
            </div>
          </div>
          <p className="text-gray-500 mb-8">
            {new Date(+blogData[0]?.createdAt).toDateString()}
          </p>
          <article className="prose prose-zinc max-sm:prose-base contents textWarp">
            {Parser().parse(blogData[0]?.content)}
          </article>
          <CommentSec blogId={blogData[0]?.id} />
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
