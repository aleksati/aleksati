import PostListPagination from "../components/PostListPagination";
import PostListItem from "../components/PostListItem";
// import ClientOnly from "../components/ClientOnly";

const PostList = ({ frontMatter, numbPages }) => {
  const currPage = parseInt(frontMatter[0].page);

  return (
    <div className="grid grid-cols-1 gap-12">
      {/* <ClientOnly className="grid grid-cols-1 gap-12"> */}
      {frontMatter.map((post, i) => (
        <PostListItem
          key={post.slug}
          slug={post.slug}
          date={post.date}
          title={post.title}
          summary={post.summary}
          pageNumber={post.page}
          keywords={post.keywords}
          readingTime={post.readingTime}
        />
      ))}
      <PostListPagination currPage={currPage} numbPages={numbPages} />
      {/* </ClientOnly> */}
    </div>
  );
};

export default PostList;
