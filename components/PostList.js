import PostListItem from "./PostListItem";
import PostFilter from "./PostFilter";
import { useState } from "react";

const PostList = ({ categories }) => {
  const [activeFilter, setActiveFilter] = useState("");

  return (
    <>
      <div className="pb-4 w-full">
        <PostFilter
          onClick={(e) => setActiveFilter(e)}
          categories={categories}
          activeFilter={activeFilter}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((item) => (
          <PostListItem item={item} key={item.category} />
        ))}
      </div>
    </>
  );
};

export default PostList;
