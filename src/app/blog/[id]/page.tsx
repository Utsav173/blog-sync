import CommentSec from '@/components/CommentSec';
import DeleteComp from '@/components/DeleteComp';
import RatingBlog from '@/components/RatingBlog';
import { db } from '@/context/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Parser } from 'html-to-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { AiOutlineEdit } from 'react-icons/ai';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // read route params
  const id = params.id;

  const querySnapshot = await getDocs(
    query(collection(db, 'blogs'), where('slug', '==', id))
  );
  if (querySnapshot.empty) {
    return {
      title: 'Blog Not Found',
    };
  } else {
    return {
      title: querySnapshot.docs[0].data().title,
      description: querySnapshot.docs[0].data().content.slice(0, 25),
    };
  }
}
const SingleNote = async ({ params }: { params: { id: string } }) => {
  const slug = params.id;
  const querySnapshot = await getDocs(
    query(collection(db, 'blogs'), where('slug', '==', slug))
  );

  if (querySnapshot.empty) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-[#282828] font-semibold">
          🔍 Blog Not Found
        </p>
      </div>
    );
  }

  const noteData: any = {
    id: querySnapshot.docs[0].id,
    ...querySnapshot.docs[0].data(),
  };

  return (
    <div className="py-10 px-6 max-sm:px-3 pt-0" suppressHydrationWarning>
      <div className="porse max-w-5xl mx-auto">
        <div className="flex py-5 bg-blend-saturation items-center justify-between mb-6 bleedBg">
          <h1 className="text-3xl font-bold">{noteData?.title}</h1>
          <div className="flex gap-2">
            {cookies().get('userId')?.value == noteData?.authorId && (
              <>
                <Link
                  href={`/blog/edit/${slug}`}
                  className="text-[#5d95ff] hover:text-[#0389ff]"
                >
                  <AiOutlineEdit className="h-5 w-5" />
                </Link>
                <DeleteComp id={noteData?.id} authorId={noteData?.authorId} />
              </>
            )}
          </div>
        </div>{' '}
        <p className="text-gray-500 mb-8">
          {noteData?.createdAt.toDate().toDateString()}
        </p>
        <RatingBlog Id={noteData.id} />
        <article className="prose prose-zinc max-sm:prose-base contents textWarp">
          {Parser().parse(noteData?.content)}
        </article>
        <CommentSec blogId={noteData?.id} />
      </div>
    </div>
  );
};

export default SingleNote;
