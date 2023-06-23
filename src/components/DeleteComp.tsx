'use client';

import { db } from '@/context/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const DeleteComp = ({ id, authorId }: any) => {
  const router = useRouter();
  const deleteDocF = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get('bookid');
    const auhtorId = formData.get('auhtorId');
    const delRef = doc(db, 'blogs', id as string);

    if (Cookies.get('userId') == auhtorId) {
      await deleteDoc(delRef)
        .then(() => {
          console.log('book deleted successfully');
          router.prefetch('/');
          router.push('/');
        })
        .catch((err) => console.log(err));
    } else {
      console.log('not your Blog');
    }
  };
  return (
    <form onSubmit={(e) => deleteDocF(e)} >
      <input type="hidden" value={id} name="bookid" />
      <input type="hidden" value={authorId} name="auhtorId" />
      <button type="submit">
        <AiOutlineDelete className="text-red-500 h-5 w-5" />
      </button>
    </form>
  );
};

export default DeleteComp;
