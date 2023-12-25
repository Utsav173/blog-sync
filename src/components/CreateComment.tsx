'use client';

import { createComments } from '@/context/func';
import Cookies from 'js-cookie';
import { useRef } from 'react';

const CreateComment = ({ blogId }: { blogId: string }) => {
  const ref = useRef<HTMLFormElement>(null);

  const addComments = async (formData: FormData) => {
    try {
      formData.append('blogId', blogId);
      await createComments(formData);
      await ref.current?.reset();
      alert('comment added successfully');
    } catch (error) {
      console.error('Error adding comments:', error);
      alert(error);
    }
  };
  return Cookies.get('userData') ? (
    <form ref={ref} className="mb-4" action={addComments}>
      <label
        className="block mb-2 font-bold text-base-content"
        htmlFor="comment-input"
      >
        Add a comment:
      </label>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
        id="comment-input"
        name="comment"
        placeholder="Write your comment here..."
        required
        rows={4}
      ></textarea>
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        type="submit"
      >
        Submit
      </button>
    </form>
  ) : null;
};

export default CreateComment;
