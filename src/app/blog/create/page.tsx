'use client';

import MyContext from '@/context';
import { modules } from '@/context/constant';
import { auth, db } from '@/context/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
  const { setIsLogin } = useContext(MyContext);
  const [content, setContent] = useState<any>();
  const router = useRouter();

  const checkItLoggedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('is Loogedin');
        Cookies.set('userId', user.uid);
        Cookies.set('userData', JSON.stringify(user));
        return setIsLogin(true);
      } else {
        return router.push('/auth/login');
      }
    });
  };

  const addDocTof = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.get('title') || !content) {
      return alert('title is required');
    }
    console.log({
      title: formData.get('title'),
      description: formData.get('description'),
      content: content,
    });

    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const userCollectionRef = collection(db, 'blogs');
        await addDoc(userCollectionRef, {
          title: formData.get('title'),
          content: content,
          description: formData.get('description'),
          createdAt: serverTimestamp(),
          author: user.displayName || user.email,
          authorId: userId,
        })
          .then(() => {
            console.log('Document successfully written!');
            router.prefetch('/');
            router.push('/');
            alert('Document successfully written!');
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
            alert(error);
          });
      }
    });
  };

  useEffect(() => {
    checkItLoggedIn();
  }, []);
  return (
    <div className="flex w-full justify-center items-center py-10">
      <form
        onSubmit={(e) => addDocTof(e)}
        className="flex transition-all flex-col gap-3 max-lg:w-[60%] max-sm:w-full max-sm:mx-6"
      >
        <input
          required
          type="text"
          name="title"
          placeholder="Title"
          className="rounded-md px-2 py-1 text-black border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
        />
        <input
          required
          type="text"
          name="description"
          placeholder="Description"
          className="rounded-md px-2 py-1 text-black border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
        />

        <ReactQuill theme="snow" onChange={setContent} modules={modules} />

        <button
          type="submit"
          className="bg-[#303030] hover:bg-blue-600 text-white rounded-sm px-4 py-2"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
