import EditComponent from '@/components/EditComponent';
import { sql } from '@/context/func';

const EditNote = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const blogData = await sql('SELECT * FROM blogs WHERE id = $1', [id]);

  if (blogData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-[#282828] font-semibold">
          🔍 Blog Not Found
        </p>
      </div>
    );
  }

  return (
    <div className="text-white py-10 px-6">
      <EditComponent blogData={blogData} />
    </div>
  );
};

export default EditNote;
