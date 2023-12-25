'use client';
import { Suspense, useState } from 'react';
import { modules } from '@/context/constant';
import { updateBlog } from '@/context/func';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const EditComponent = ({ blogData }: { blogData: any }) => {
  const [editContent, setEditContent] = useState(blogData[0]?.content);
  const { push } = useRouter();
  const handleUpdate = async (formData: FormData) => {
    formData.append('content', editContent);
    formData.append('blogId', blogData[0]?.id);
    formData.append('auhtorId', blogData[0]?.authorId);
    const res = await updateBlog(formData);
    if (res?.error) {
      alert(res.error);
    } else {
      setEditContent('');
      push('/');
      alert('blog updated successfully');
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form
        action={handleUpdate}
        className="text-black flex flex-col justify-between gap-4"
      >
        <input
          type="text"
          name="title"
          required
          defaultValue={blogData[0]?.title}
          className="px-4 py-2  border border-gray-600 rounded-lg"
        />
        <input
          type="text"
          name="description"
          required
          defaultValue={blogData[0]?.description}
          className="px-4 py-2  border border-gray-600 rounded-lg"
        />
        <ReactQuill
          theme="snow"
          value={editContent}
          defaultValue={blogData[0]?.content}
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
    </Suspense>
  );
};

export default EditComponent;
