import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Tag } from './tag';

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
}

export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
}: PostItemProps) {
  return (
    <article className="group flex flex-col gap-4 px-3 border-b border-gray-200 dark:border-gray-700 py-4 hover:bg-gray-950 dark:hover:bg-white transition duration-200 ease-in-out hover:rounded-md">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-white dark:group-hover:text-black">
          <Link href={'/' + slug} className="hover:underline" prefetch={true}>
            {title}
          </Link>
        </h2>
      </div>
      <div className="flex gap-2 flex-wrap group-hover:text-white dark:group-hover:text-black">
        {tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      <div className="text-base md:text-lg text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black">
        {description}
      </div>
      <div className="flex justify-between items-center mt-2">
        <dl className="flex items-center gap-2">
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1 group-hover:text-white dark:group-hover:text-black">
            <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-white dark:group-hover:text-black" />
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </dl>
        <Link
          href={'/' + slug}
          className={
            'group-hover:text-black group-hover:dark:text-white custom-button inline-flex items-center gap-2 bg-black text-white group-hover:bg-white dark:bg-white dark:text-black dark:group-hover:bg-black rounded-full font-semibold py-2 whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-300 ease-in-out no-underline px-2'
          }
          prefetch={true}
        >
          <span className="pl-2 max-sm:hidden">Read more</span>
          <span className="custom-button__icon-wrapper bg-white text-black dark:bg-black dark:text-white group-hover:bg-black group-hover:text-white group-hover:dark:bg-white group-hover:dark:text-black">
            <svg
              width="10"
              className="custom-button__icon-svg"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 15"
            >
              <path
                fill="currentColor"
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              ></path>
            </svg>

            <svg
              className="custom-button__icon-svg  custom-button__icon-svg--copy"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              fill="none"
              viewBox="0 0 14 15"
            >
              <path
                fill="currentColor"
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              ></path>
            </svg>
          </span>
        </Link>
      </div>
    </article>
  );
}
