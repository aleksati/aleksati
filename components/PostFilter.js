import PostFilterItem from "./PostFilterItem";
import { useState } from "react";
import Icon from "./Icon";

const PostFilter = ({ onClick, categories, activeFilter }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="flex space-x-2 items-center">
      <a
        className="cursor-pointer py-2"
        onClick={() => setIsShown((prevState) => !prevState)}
      >
        <Icon id={!isShown ? "filter" : "x"} iconSize={"text-xl"} />
      </a>
      {isShown ? (
        <div className="flex space-x-2">
          {categories.map((cat) => (
            <PostFilterItem
              onClick={onClick}
              isActive={activeFilter === cat.category}
              key={cat.category}
              color={cat.color}
            >
              {cat.category}
            </PostFilterItem>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PostFilter;
