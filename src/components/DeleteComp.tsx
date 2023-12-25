'use client';
import { deleteBlog } from '@/context/func';
import { useRouter } from 'next/navigation';
import { AiOutlineDelete } from 'react-icons/ai';

const DeleteComp = ({ id, authorId }: any) => {
  const { push } = useRouter();
  const deleteDocF = async (formData: FormData) => {
    formData.append('blogId', id);
    formData.append('auhtorId', authorId);
    const res = await deleteBlog(formData);

    if (res?.error) {
      alert(res?.error);
    } else {
      push('/');
    }
  };
  return (
    <form action={deleteDocF}>
      <button type="submit">
        <AiOutlineDelete className="text-red-500 h-5 w-5" />
      </button>
    </form>
  );
};

export default DeleteComp;
