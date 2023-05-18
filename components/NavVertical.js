import { useClickOutside } from "../hooks/useClickOutside";
import NavVerticalTabs from "./NavVerticalTabs";
import ButtonTheme from "./ButtonTheme";
import { useEffect } from "react";
import Search from "./Search";
import Link from "next/link";

const NavVertical = ({ showNavTop, onToggleNavVertical }) => {
  const [ref, isClickOutside] = useClickOutside();

  useEffect(() => {
    if (isClickOutside && showNavTop) onToggleNavVertical();
  }, [isClickOutside, onToggleNavVertical, showNavTop]);

  return (
    <div
      className={`z-60 pt-6 min-h-screen border-r border-secondary bg-primary-light dark:bg-primary-dark dark:border-secondary-dark space-y-12 ${
        showNavTop ? "fixed" : "flex-none"
      } w-64 p-4`}
      ref={ref}>
      <div className="w-56 fixed z-20">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="font-bold">
              aleksati.net
            </Link>
          </div>
          <div>
            <ButtonTheme />
          </div>
        </div>
      </div>
      <div className="fixed z-20">
        <Search />
      </div>
      <div className="fixed z-10 pt-14">
        <NavVerticalTabs />
      </div>
    </div>
  );
};

export default NavVertical;
