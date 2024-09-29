import PostListItem from "../components/PostListItem";
import Pagination from "../components/Pagination";

// how many items to show on each page
const pageThresh = 5;

const PostList = ({
  frontMatterList,
  showType = false,
}: {
  frontMatterList: FrontMatterList;
  showType?: boolean;
}) => (
  <div className="grid grid-cols-1 gap-10">
    <Pagination frontMatterList={frontMatterList} threshold={pageThresh}>
      {(data) =>
        data.map((post) => (
          <PostListItem key={post.slug} showType={showType} {...post} />
        ))
      }
    </Pagination>
  </div>
);

export default PostList;
