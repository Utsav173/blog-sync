'use client';
import { modules } from '@/context/constant';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
import 'react-quill/dist/quill.snow.css';
import { createBlog } from '@/context/func';

const CreateBlog = () => {
  const [content, setContent] = useState<any>();
  const router = useRouter();

  const addDocTof = async (formData: FormData) => {
    if (content) {
      formData.append('content', content);
      const res = await createBlog(formData);
      if (res?.error) {
        alert(res.error);
      }
      alert('blog created successfully');
      setContent('');
      router.push('/');
    }
  };

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (!userId) {
      router.push('/auth/login');
    }
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex w-full justify-center items-center py-10">
        <form
          action={addDocTof}
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
    </Suspense>
  );
};

export default CreateBlog;
