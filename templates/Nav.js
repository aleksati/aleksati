import NavRight from "../components/NavRight";
import MyLink from "../components/MyLinks";
import { useState } from "react";

const categories = ["posts", "projects", "research", "about"];

const Nav = ({ showSearchAndTheme, showProfile, showMenu }) => {
  const [activeCat, setActiveCat] = useState("blog");

  const handleClick = (e) => setActiveCat(e.target.innerHTML);

  return (
    <nav
      className="z-50 bg-primary-light dark:bg-primary-dark px-8 border-r border-primary-light dark:border-primary-dark"
      aria-label="Navbar"
      role="toolbar"
    >
      <div className="flex flex-col space-y-6 items-start justify-start p-4">
        {categories.map((cat) => (
          <MyLink
            key={cat}
            type="tab"
            onClick={handleClick}
            active={cat === activeCat}
          >
            {cat}
          </MyLink>
        ))}
      </div>
      {/* <NavRight /> */}
    </nav>
  );
};

export default Nav;
