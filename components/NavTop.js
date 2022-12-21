import PostFilter from "./PostFilter";
import IconTheme from "./IconTheme";
import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";

const NavTop = ({
  showSearch,
  showTheme,
  showPostFilter,
  showBackButton,
  categories,
}) => {
  const [activeFilter, setActiveFilter] = useState("");

  return (
    <nav
      className="z-40 w-full py-4 border-primary-light dark:border-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      <div className="flex justify-end">
        {/* <div className="flex space-x-2 items-center"> */}
        {/* {showBackButton ? (
            <Link href="/">
              <Icon id="prevArrow" />
            </Link>
          ) : null} */}
        {/* {showPostFilter ? (
            // <PostFilter
            //   onClick={(e) => setActiveFilter(e)}
            //   categories={categories}
            //   activeFilter={activeFilter}
            // />
            <></>
          ) : null} */}
        {/* </div> */}
        {/* <div className="flex"> */}
        <div className="flex space-x-2 items-center">
          {showSearch ? (
            <input
              className="form-search bg-primary-light dark:bg-primary-dark rounded w-42 md:w-46 h-8"
              placeholder="&#x1F50E;&#xFE0E; search"
              id="site-search"
              type="search"
            />
          ) : null}
          {/* {showTheme ? <IconTheme /> : null} */}
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default NavTop;
