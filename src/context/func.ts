'use server';

import { deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function deleteDocf(formData: FormData) {
  const id = formData.get('bookid');
  const auhtorId = formData.get('auhtorId');
  const delRef = doc(db, 'blogs', id as string);

  if (cookies().get('userId')?.value == auhtorId) {
    await deleteDoc(delRef)
      .then(() => {
        console.log('book deleted successfully');
        revalidatePath('/');
        window.location.href = '/';
      })
      .catch((err) => console.log(err));
  } else {
    console.log('not your Blog');
  }
}
