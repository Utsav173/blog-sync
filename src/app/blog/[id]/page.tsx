export const revalidate = 30;
import DeleteComp from '@/components/DeleteComp';
import { db } from '@/context/firebase';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { Parser } from 'html-to-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { AiOutlineEdit } from 'react-icons/ai';

const SingleNote = async ({ params }: { params: { id: string } }) => {
  const slug = params.id;
  const blogsRef = collection(db, 'blogs');
  const q = query(blogsRef, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);

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
    <div className="py-10 px-6 max-sm:px-3 pt-0">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6 bleedBg">
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
        <div className="prose prose-zinc max-sm:prose-base contents textWarp">
          {Parser().parse(noteData?.content)}
        </div>
      </div>
    </div>
  );
};

export default SingleNote;
