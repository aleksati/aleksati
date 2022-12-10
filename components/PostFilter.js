import PostFilterItem from "./PostFilterItem";
import { useState } from "react";
import Icon from "./Icon";

const PostFilter = ({ onClick, categories, activeFilter }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <a
        className="cursor-pointer py-2"
        onClick={() => setIsShown((prevState) => !prevState)}>
        <Icon id={!isShown ? "filter" : "x"} />
      </a>
      {isShown ? (
        <div className="flex space-x-2">
          {categories.map((cat) => (
            <PostFilterItem
              onClick={onClick}
              isActive={activeFilter === cat}
              key={cat}>
              {cat}
            </PostFilterItem>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default PostFilter;
