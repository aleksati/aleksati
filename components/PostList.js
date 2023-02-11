import PostListPagination from "./Pagination";
import PostListItem from "./PostListItem";
import ClientOnly from "./ClientOnly";

const PostList = ({ currPage, frontMatter, numbPages }) => {
  return (
    <ClientOnly className="grid grid-cols-1 gap-12">
      {frontMatter.map((post, i) => (
        <PostListItem
          key={post.slug}
          slug={post.slug}
          date={post.date}
          title={post.title}
          summary={post.summary}
          pageNumber={post.page}
          categories={post.categories}
          readingTime={post.readingTime}
        />
      ))}
      <PostListPagination currPage={currPage} numbPages={numbPages} />
    </ClientOnly>
  );
};

export default PostList;
