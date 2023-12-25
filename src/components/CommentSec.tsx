import { sql } from '@/context/func';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const CreateComment = dynamic(() => import('@/components/CreateComment'));

const CommentSec = async ({ blogId }: { blogId: string }) => {
  await sql`CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    "blogId" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author TEXT,
    comment TEXT
  )`;

  const comments = await sql(
    `SELECT * FROM comments WHERE "blogId" = '${blogId}' ORDER BY "createdAt" DESC`
  );

  return (
    <div className="p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <CreateComment blogId={blogId} />
      </Suspense>
      <div>
        {comments?.length > 0 &&
          comments?.map((comment) => (
            <div
              key={comment.id}
              className="border border-gray-300 p-4 mb-4 rounded-lg prose-orange"
            >
              <h3 className="text-xl font-bold mb-2">{comment.author}</h3>
              <p>{comment.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentSec;
