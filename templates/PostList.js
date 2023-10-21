import PostListItem from "../components/PostListItem";
import Pagination from "../components/Pagination";

const pageThresh = 5;

const PostList = ({ frontMatter }) => (
  <div className="grid grid-cols-1 gap-10">
    <Pagination data={frontMatter} threshold={pageThresh}>
      {(data) =>
        data.map((post) => (
          <PostListItem
            key={post.slug}
            slug={post.slug}
            date={post.date}
            title={post.title}
            summary={post.summary}
            keywords={post.keywords}
            type={post.type}
            // readingTime={post.readingTime}
          />
        ))
      }
    </Pagination>
  </div>
);

export default PostList;
