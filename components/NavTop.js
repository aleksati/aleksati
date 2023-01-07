// import PostFilter from "./PostFilter";
import IconTheme from "./IconTheme";
import { useState } from "react";
import Link from "next/link";
// import Icon from "./Icon";

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
      className="z-50 border-b border-secondary fixed w-full bg-primary-light dark:bg-primary-dark border-secondary dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      <div className="flex justify-between items-center justify-center">
        <div className="w-1/2 flex items-center space-x-2">
          <div className="w-48 py-4">
            <div className="px-4">
              <Link href="/" className="font-bold">
                TIDEMANN.XYZ
              </Link>
            </div>
          </div>
          {/* <div className="w-40 text-sm text-secondary">
            <p>posts / music-tech</p>
          </div> */}
        </div>

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
        <div className="flex space-x-2 items-center py-2">
          <input
            className="form-search bg-primary-light dark:bg-primary-dark rounded w-42 md:w-46 h-8"
            placeholder="&#x1F50E;&#xFE0E; search"
            id="site-search"
            type="search"
          />
          <IconTheme />
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default NavTop;
