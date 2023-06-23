import DeleteComp from '@/components/DeleteComp';
import { db } from '@/context/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Parser } from 'html-to-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { AiOutlineEdit } from 'react-icons/ai';

const SingleNote = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const docRef = doc(db, 'blogs', id as string);

  const docSnapshot = await getDoc(docRef);
  const noteData = docSnapshot.data();

  return (
    <div className="py-10 px-6 max-sm:px-3 pt-0">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6 bleedBg">
          <h1 className="text-3xl font-bold">{noteData?.title}</h1>
          <div className="flex gap-2">
            {cookies().get('userId')?.value == noteData?.authorId && (
              <>
                <Link
                  href={`/blog/edit/${id}`}
                  className="text-[#5d95ff] hover:text-[#0389ff]"
                >
                  <AiOutlineEdit className="h-5 w-5" />
                </Link>
                <DeleteComp id={id} authorId={noteData?.authorId} />
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
