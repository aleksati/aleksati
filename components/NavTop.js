import IconTheme from "./IconTheme";
import Link from "next/link";
import Icon from "./Icon";
import Search from "./Search";

// SearchNormal
// SearchBig
// SearchBigToggle

const NavTop = ({ onClick, showSearch }) => {
  return (
    <nav
      className="z-50 border-secondary fixed w-full border-secondary bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      {/* <div className="items-center space-x-2 p-2 flex">
        <input
          className="form-search resize bg-primary-light dark:bg-primary-dark rounded-sm h-8 w-full"
          placeholder="&#x1F50E;&#xFE0E; search"
          id="search"
          type="search"
        />
        <a className="hover:cursor-pointer">
          <Icon id={"x"} iconSize={"text-xl"} />
        </a>
      </div> */}
      <div className="flex justify-between items-center justify-center">
        <div className="w-1/2 flex items-center space-x-2">
          <div className="w-42 py-4">
            <div className="px-4 justify-between space-x-2 items-center flex">
              <Link
                href="/"
                className="font-bold text-sm md:text-base items-center">
                aleksati.net
              </Link>
              <a onClick={onClick} className="hover:cursor-pointer">
                <Icon id={"threedots"} iconSize={"text-md md:text-xl"} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 bg-red-200 items-center justify-end py-2 mr-4">
          <div>
            <Search showSearch={showSearch} />
          </div>
          <div>
            <IconTheme />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavTop;
