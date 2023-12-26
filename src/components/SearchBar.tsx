'use client';

import Link from 'next/link';
import { useState } from 'react';

const SearchBar = ({ blogsData }: { blogsData: any }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBlogs = JSON.parse(blogsData).filter((blog: any) => {
    const { title, description } = blog;
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return (
    <>
      <form className="group relative">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
        <input
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
          type="text"
          aria-label="Filter blog"
          placeholder="Filter blog..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      {searchQuery && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
          {filteredBlogs.length ? (
            filteredBlogs.map((blog: any) => (
              <div key={blog.id} className="mb-4">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  <h2 className="text-lg font-medium">{blog.title}</h2>
                </Link>
                <p className="text-gray-600">
                  {blog.description.slice(0, 65)}...
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No matching blogs found</p>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBar;
