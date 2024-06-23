import { getAllTags, sortPosts, sortTagsByCount } from '@/lib/utils';
import { posts } from '#site/content';
import { PostItem } from '@/components/post-item';
import { QueryPagination } from '@/components/query-pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag } from '@/components/tag';

const POSTS_PER_PAGE = 5;

interface HomePageProps {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  // const latestPosts = sortPosts(posts).slice(0, 5);
  // return (
  //   <>
  //     <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
  //       <div className="container flex flex-col gap-4 text-center">
  //         <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
  //           Hello, I&apos;m Utsav Khatri
  //         </h1>
  //         <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
  //           Welcome to my blog site. Built using tailwind, shadcn, velite
  //           and Nextjs 14.
  //         </p>
  //         <div className="flex flex-col gap-4 justify-center sm:flex-row">
  //           <Link
  //             href="/blog"
  //             className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
  //           >
  //             View my blog
  //           </Link>
  //           <Link
  //             href={siteConfig.links.github}
  //             target="_blank"
  //             rel="noreferrer"
  //             className={cn(
  //               buttonVariants({ variant: "outline", size: "lg" }),
  //               "w-full sm:w-fit"
  //             )}
  //           >
  //             GitHub
  //           </Link>
  //         </div>
  //       </div>
  //     </section>
  //     <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
  //       <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
  //         Latest Posts
  //       </h2>
  //       <ul className="flex flex-col">
  //         {latestPosts.map((post) => (
  //           post.published && (
  //             <li key={post.slug} className="first:border-t first:border-border">
  //               <PostItem
  //                 slug={post.slug}
  //                 title={post.title}
  //                 description={post.description}
  //                 date={post.date}
  //                 tags={post.tags}
  //               />
  //             </li>
  //           )
  //         ))}
  //       </ul>
  //     </section>
  //   </>
  // );
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Blog Sync</h1>
          <p className="text-xl text-muted-foreground">
            My ramblings on all things web dev.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const { slug, date, title, description, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                      tags={tags}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nothing to see here yet</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((tag) => (
              <Tag tag={tag} key={tag} count={tags[tag]} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
