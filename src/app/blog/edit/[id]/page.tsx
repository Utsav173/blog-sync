'use client';
import { modules } from '@/context/constant';
import { db } from '@/context/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css';

const EditNote = ({ params }: { params: { id: string } }) => {
  const [noteData, setNoteData] = useState<any>();
  const [editContent, setEditContent] = useState<any>(noteData?.content);
  const id = params.id;
  const docRef = doc(db, 'blogs', id as string);
  const router = useRouter();

  const getEditorData = async () => {
    const docSnapshot = await getDoc(docRef);
    setNoteData(docSnapshot.data());
    setEditContent(docSnapshot.data()?.content);
    console.log(noteData);
  };
  useEffect(() => {
    getEditorData();
  }, []);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const noteRef = await doc(db, 'blogs', id);
    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();
    const content = editContent;
    console.log({
      title,
      content,
      description,
    });

    if (Cookies.get('userId') == noteData?.authorId) {
      await updateDoc(noteRef, { title, content });
      router.prefetch(`/blog/${id}`);
      alert('update successfully');
      router.push(`/blog/${id}`);
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
