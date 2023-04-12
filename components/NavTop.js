import { useState, useCallback, useRef } from "react";
import ButtonIcon from "./ButtonIcon";
import ButtonTheme from "./ButtonTheme";
import Search from "./Search";
import Link from "next/link";

const NavTop = ({ onShowVerticalNav, isMobileSearch }) => {
  const [isSearch, setIsSearch] = useState(false);
  const searchRef = useRef(null);

  const handleSearchToggle = () => setIsSearch((prevState) => !prevState);

  const handleMobileClickOutside = useCallback(() => {
    setIsSearch(false);
  }, [setIsSearch]);

  return (
    <nav
      className="z-50 fixed w-full bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar"
    >
      {isSearch && isMobileSearch ? (
        <div
          className="items-center justify-between space-x-4 px-4 py-2.5 flex"
          ref={searchRef}
        >
          <Search
            focusOnMount={true}
            onMobileClickOutside={handleMobileClickOutside}
          />
          <ButtonIcon onClick={handleSearchToggle} iconId="x" />
          <ButtonTheme />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="w-1/2 flex items-center space-x-2">
            <div className="w-48 md:w-52 p-4 justify-start space-x-4 items-center flex">
              <ButtonIcon onClick={onShowVerticalNav} iconId="threedots" />
              <Link
                href="/"
                className="font-bold text-sm md:text-base items-center"
              >
                aleksati.net
              </Link>
            </div>
          </div>
          <div className="flex space-x-4 items-center justify-end mr-4">
            {isMobileSearch ? (
              <ButtonIcon onClick={handleSearchToggle} iconId="search" />
            ) : (
              <Search />
            )}
            <ButtonTheme />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavTop;
