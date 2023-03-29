import NavVerticalTabs from "./NavVerticalTabs";
import Link from "next/link";
import Icon from "./Icon";

const NavVertical = ({ onClick }) => {
  return (
    <nav
      className="z-50 fixed border-r border-secondary bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar"
    >
      <div className="flex flex-col min-h-screen items-start justify-between w-48">
        <div className="w-full">
          <div className="py-4 px-4 items-center justify-between flex pb-6 border-secondary">
            <Link href="/" className="font-bold">
              aleksati.net
            </Link>
            <a onClick={onClick} className="hover:cursor-pointer">
              <Icon id={"x"} iconSize={"text-xl"} />
            </a>
          </div>
          <div className="space-y-6 px-4 pt-0 w-full">
            <NavVerticalTabs />
          </div>
        </div>
        {/* <div className="border-t border-secondary w-full text-xs">
          <div className="px-4 py-2">&copy; {new Date().getFullYear()}</div>
        </div> */}
      </div>
    </nav>
  );
};

export default NavVertical;
