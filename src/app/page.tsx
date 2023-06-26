export const revalidate = 30;
import Hemder from '@/components/Hemder';
import SIngleBlog from '@/components/SIngleBlog';
import { db } from '@/context/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
const getBlogsData = async () => {
  try {
    const notesRef = collection(db, 'blogs');
    const notesQuery = query(notesRef, orderBy('createdAt'));
    const querySnapshot = await getDocs(notesQuery);
    const notesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return notesData;
  } catch (error) {
    console.error('Error retrieving notes data:', error);
    return [];
  }
};
export default async function Home() {
  const blogsData = await getBlogsData();

  return (
    <section>
      <Hemder blogsData={JSON.stringify(blogsData)} />

      <ul className=" p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-sm leading-6">
        {blogsData.length ? (
          blogsData?.map((blog: any) => (
            <SIngleBlog blog={blog} key={blog.id} />
          ))
        ) : (
          <h4>No blogs</h4>
        )}
      </ul>
    </section>
  );
}
