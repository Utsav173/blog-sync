'use client';
import { modules } from '@/context/constant';
import { db } from '@/context/firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css';
import slugify from 'slugify';

const EditNote = ({ params }: { params: { id: string } }) => {
  const [noteData, setNoteData] = useState<any>();
  const [editContent, setEditContent] = useState<any>(noteData?.content);
  const slug: string = params.id;

  const router = useRouter();

  const getEditableData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, 'blogs'), where('slug', '==', slug))
    );
    const docSnapshot = querySnapshot.docs[0].data();
    setNoteData({
      id: querySnapshot.docs[0].id,
      ...docSnapshot,
    });
    setEditContent(docSnapshot?.content);
  };

  useEffect(() => {
    getEditableData();
  }, []);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const noteRef = await doc(db, 'blogs', noteData.id);
    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();
    const content = editContent;
    const slugD = slugify(title as string, { lower: true, remove: /[$*_+~.(),'"!:@]/g, trim: true, }) || slug;
    if (Cookies.get('userId') == noteData?.authorId) {
      await updateDoc(noteRef, { title, content, description, slug: slugD });
      router.prefetch(`/blog/${slugD}`);
      alert('update successfully');
      router.push(`/blog/${slugD}`);
    } else {
      alert('not your blog');
    }
  };

  return (
    <div className="text-white py-10 px-6">
      <form
        onSubmit={(e) => handleUpdate(e)}
        className="text-black flex flex-col justify-between gap-4"
      >
        <input
          type="text"
          name="title"
          defaultValue={noteData?.title}
          className="px-4 py-2  border border-gray-600 rounded-lg"
        />
        <input
          type="text"
          name="description"
          defaultValue={noteData?.description}
          className="px-4 py-2  border border-gray-600 rounded-lg"
        />
        <ReactQuill
          theme="snow"
          value={editContent}
          defaultValue={noteData?.content}
          onChange={setEditContent}
          modules={modules}
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditNote;
