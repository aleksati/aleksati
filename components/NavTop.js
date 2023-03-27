// import PostFilter from "./PostFilter";
import IconTheme from "./IconTheme";
import { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";

const NavTop = ({ onClick }) => {
  return (
    <nav
      className="z-50 border-secondary fixed w-full border-secondary bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      <div className="flex justify-between items-center justify-center">
        <div className="w-1/2 flex items-center space-x-2">
          <div className="w-48 py-4">
            <div className="px-4 justify-between items-center flex border-secondary">
              <Link href="/" className="font-bold items-center">
                aleksati.net
              </Link>
              <a onClick={onClick} className="hover:cursor-pointer">
                <Icon id={"threedots"} iconSize={"text-xl"} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 items-center py-2 mr-2">
          <input
            className="form-search bg-primary-light dark:bg-primary-dark rounded w-42 md:w-46 h-8"
            placeholder="&#x1F50E;&#xFE0E; search"
            id="site-search"
            type="search"
          />
          <IconTheme />
        </div>
      </div>
    </nav>
  );
};

export default NavTop;
