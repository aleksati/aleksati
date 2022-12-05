import { useEffect, useState } from "react";

const PostListItem = ({ item }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (item.color) {
      setColor("border-" + item.color);
    }
  }, [item]);

  return (
    <div className="border rounded border-primary-light dark:border-primary-dark p-4 space-y-2">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => {}}>
        Some title about MusTech
      </h1>
      <div className="flex space-x-2 text-xs items-center">
        <p>11.12.22</p>
        <p className={`p-1 border ${color}`}>{item.category}</p>
      </div>
      <p>
        Something something something Something something something Something
        something something Something something something Something something
        somethingSomething something somethingSomething something something
      </p>
      <div>
        <a className="font-bold cursor-pointer" onClick={() => {}}>
          Read more
        </a>
      </div>
    </div>
  );
};

export default PostListItem;
