import NavVerticalTabs from "./NavVerticalTabs";
import ButtonIcon from "./ButtonIcon";
import Link from "next/link";
// import Icon from "./Icon";

const NavVertical = ({ onShowVerticalNav }) => {
  return (
    <nav
      className="z-50 fixed border-r border-secondary bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar"
    >
      <div className="flex flex-col p-4 min-h-screen items-start justify-start w-48 md:w-52">
        <div className="space-x-4 items-center justify-start flex pb-6">
          <ButtonIcon onClick={onShowVerticalNav} iconId="x" />
          <Link href="/" className="font-bold text-sm md:text-base">
            aleksati.net
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {/* just a filler */}
          <div className="p-2"></div>
          <NavVerticalTabs />
        </div>
      </div>
    </nav>
  );
};

export default NavVertical;
