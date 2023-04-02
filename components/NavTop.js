import SearchToggle from "./SearchToggle";
import IconTheme from "./IconTheme";
import { useState } from "react";
import Search from "./Search";
import Link from "next/link";
import Icon from "./Icon";

const NavTop = ({ onShowVerticalNav, isMobileSearch }) => {
  const [isSearch, setIsSearch] = useState(false);

  const handleSearchToggle = () => setIsSearch((prevState) => !prevState);

  return (
    <nav
      className="z-50 fixed w-full bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar"
    >
      {isSearch && isMobileSearch ? (
        <div className="items-center space-x-2 px-4 py-2 flex">
          <Search focusOnMount={true} />
          <a className="hover:cursor-pointer" onClick={handleSearchToggle}>
            <Icon id={"x"} iconSize={"text-xl"} />
          </a>
          <IconTheme />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="w-1/2 flex items-center space-x-2">
            <div className="w-48 py-4">
              <div className="px-4 justify-between space-x-2 items-center flex">
                <Link
                  href="/"
                  className="font-bold text-sm md:text-base items-center"
                >
                  aleksati.net
                </Link>
                <a onClick={onShowVerticalNav} className="hover:cursor-pointer">
                  <Icon id={"threedots"} iconSize={"text-md md:text-xl"} />
                </a>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 items-center justify-end py-2 mr-4">
            {isMobileSearch ? (
              <SearchToggle onSearchToggle={handleSearchToggle} />
            ) : (
              <Search />
            )}
            <IconTheme />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavTop;
