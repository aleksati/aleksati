import PostListItem from "./PostListItem";

const PostList = ({ categories }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 pt-20">
        {categories.map((item) => (
          <PostListItem item={item} key={item.category} />
        ))}
      </div>
    </>
  );
};

export default PostList;
