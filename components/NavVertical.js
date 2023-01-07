import NavVerticalTabs from "./NavVerticalTabs";
import Link from "next/link";

const NavVertical = () => {
  return (
    <nav
      className="z-50 fixed border-r border-secondary bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      <div className="flex flex-col min-h-screen items-start justify-between w-48">
        <div>
          <div className="py-4 px-4 pb-4 border-b border-secondary">
            <Link href="/" className="font-bold">
              TIDEMANN.XYZ
            </Link>
          </div>
          <div className="space-y-6 px-4 pt-6 w-full text-sm">
            <NavVerticalTabs />
          </div>
        </div>
        <div className="border-t border-secondary w-full text-sm">
          <div className="px-4 py-2">credits</div>
        </div>
      </div>
    </nav>
  );
};

export default NavVertical;
