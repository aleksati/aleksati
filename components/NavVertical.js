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
      className={`z-20 ${
        showNavTop ? "w-80 fixed" : "w-64 flex-none"
      } bg-primary-light dark:bg-primary-dark border-r border-secondary min-h-screen items-start justify-start`}
      ref={ref}>
      <div
        className={`fixed space-y-6 ${
          showNavTop ? "w-80 pt-4" : "w-64 pt-8"
        } p-4`}>
        <div className="items-center w-full justify-start space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center space-x-2">
              <Link href="/" className="font-bold text-base">
                aleksati.net
              </Link>
            </div>
            <ButtonTheme iconSize={"text-md"} />
          </div>
          <Search />
        </div>
        <div className="w-full">
          <NavVerticalTabs />
        </div>
      </div>
    </div>
  );
};

export default NavVertical;
