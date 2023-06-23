import Link from 'next/link';

const SIngleBlog = ({ blog }: { blog: any }) => {
  return (
    <Link href={`/blog/${blog.id}`} className="block max-w-fit">
      <div className="bg-slate-50 rounded-lg shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold hover:decoration-2 text-gray-950 mb-2 capitalize hover:underline hover:decoration-indigo-500 hover:decoration-solid">
            {blog.title}
          </h2>
          <p className="text-gray-600 normal-case">{blog.description}</p>
          <div className="mt-4 flex flex-wrap items-center">
            <p className="text-gray-900 font-semibold mr-2 capitalize">
              {blog.author}
            </p>
            <p className="text-gray-600 mx-2">-</p>
            <p className="text-gray-600">
              {blog?.createdAt.toDate().toDateString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SIngleBlog;
