'use client';
import { auth, db } from '@/context/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState, useTransition } from 'react';

const CommentSec = ({ blogId }: { blogId: string }) => {
  const [comments, setComments] = useState<any[]>();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const getComments = async () => {
    try {
      const commentRef = collection(db, `/blogs/${blogId}/comments`);
      const commentQuery = query(commentRef, orderBy('createdAt','desc'));
      const querySnapshot = await getDocs(commentQuery);
      const notesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return setComments(notesData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  useEffect(() => {
    getComments();
  }, []);

  const addComments = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get('content') || '';
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        const blogCollectionRef = collection(db, `/blogs/${blogId}/comments`);
        await addDoc(blogCollectionRef, {
          title: formData.get('title'),
          content: content,
          description: formData.get('description'),
          createdAt: serverTimestamp(),
          author: user.displayName || user.email,
          comment: content,
        })
          .then(() => {
            // console.log('comment successfully written!');
            getComments();
            alert('comment successfully written!');
            startTransition(() => {
              router.refresh();
            });
          })
          .catch((error) => {
            console.error('Error writing comment: ', error);
            alert(error);
          });
      }
    });
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {Cookies.get('userData') && (
        <form className="mb-4" onSubmit={(e) => addComments(e)}>
          <label
            className="block mb-2 font-bold text-base-content"
            htmlFor="comment-input"
          >
            Add a comment:
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
            id="comment-input"
            name="content"
            rows={4}
          ></textarea>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            type="submit"
            disabled={isPending}
          >
            Submit
          </button>
        </form>
      )}
      <div>
        {comments?.length &&
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
