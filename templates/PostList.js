import PostListItem from "../components/PostListItem";
import Pagination from "../components/Pagination";
// import ClientOnly from "../components/ClientOnly";

const pageThresh = 5;

const PostList = ({ frontMatter }) => (
  <div className="grid grid-cols-1 gap-12">
    <Pagination data={frontMatter} threshold={pageThresh}>
      {(data) =>
        data.map((post, i) => (
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
        ))
      }
    </Pagination>
  </div>
);

export default PostList;

{
  /* <ClientOnly className="grid grid-cols-1 gap-12"> */
  /* </ClientOnly> */
}
