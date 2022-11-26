import MyLink from "./MyLinks";
import { useState } from "react";

const categories = ["blog", "music", "research", "about"];

const CategoryToggles = () => {
  const [activeCat, setActiveCat] = useState("blog");

  const handleClick = (e) => setActiveCat(e.target.innerHTML);

  return (
    <div className="flex flex-row items-center space-x-14 justify-start px-2 pb-4">
      {categories.map((cat) => (
        <MyLink key={cat} onClick={handleClick} active={cat === activeCat}>
          {cat}
        </MyLink>
      ))}
    </div>
  );
};

export default CategoryToggles;
