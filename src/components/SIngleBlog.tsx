import Link from 'next/link';

const SIngleBlog = ({ blog }: { blog: any }) => {
  return (
    <Link href={`/blog/${blog.slug}`} prefetch className="card block max-w-fit">
      <div className="bg-auto rounded-lg shadow-md">
        <div className="p-4 prose">
          <h2 className="card-title text-xl font-bold hover:decoration-2 mb-2 capitalize hover:underline hover:decoration-indigo-500 hover:decoration-solid text-primary">
            {blog.title}
          </h2>
          <p className="leading-normal line-clamp-2">{blog.description}</p>
          <div className="flex flex-wrap items-center">
            <small>{blog.author}</small>
            <span className="mx-2">-</span>
            <small>{new Date(Number(blog.createdAt)).toDateString()}</small>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SIngleBlog;
