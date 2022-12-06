import { useState } from "react";
import IconTheme from "./IconTheme";
import PostFilter from "./PostFilter";

const NavTop = ({
  showSearchAndTheme,
  showPostFilter,
  showBackButton,
  categories,
}) => {
  const [activeFilter, setActiveFilter] = useState("");

  return (
    <nav
      className="z-40 w-full py-4 absolute border-primary-light dark:border-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      <div className="flex container mx-auto justify-between">
        <div>
          {showPostFilter ? (
            <PostFilter
              onClick={(e) => setActiveFilter(e)}
              categories={categories}
              activeFilter={activeFilter}
            />
          ) : null}
        </div>
        <div className="flex">
          {showSearchAndTheme ? (
            <div className="flex space-x-2 items-center">
              <input
                type="search"
                className="bg-primary-light dark:bg-primary-dark form-search rounded w-42 md:w-46 h-8"
                id="site-search"
                placeholder="&#x1F50E;&#xFE0E; search"
              />
              <IconTheme />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default NavTop;
