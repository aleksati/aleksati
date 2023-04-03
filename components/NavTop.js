import ButtonIcon from "./ButtonIcon";
import ButtonTheme from "./ButtonTheme";
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
        <div className="items-center justify-between space-x-4 px-4 py-2.5 flex">
          <Search focusOnMount={true} />
          <ButtonIcon onClick={handleSearchToggle} iconId="x" />
          <ButtonTheme />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="w-1/2 flex items-center space-x-2">
            <div className="w-42 md:w-48 py-4">
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
          <div className="flex space-x-4 items-center justify-end py-2 mr-4">
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
