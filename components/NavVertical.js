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
    // <div
    // className={`z-20 bg-blue-200 ${
    //   showNavTop ? "w-72 fixed" : "w-64 flex-none"
    // } bg-primary-light dark:bg-primary-dark border-r border-secondary dark:border-secondary-dark min-h-screen items-start justify-start`}
    // className="flex-none bg-red-200 space-y-6"
    // ref={ref}>
    <div
      className={`z-20 bg-primary-light dark:bg-primary-dark min-h-screen border-r border-secondary dark:border-secondary-dark space-y-20 ${
        showNavTop ? "pt-4 fixed" : "pt-8 flex-none"
      } w-64 p-4`}
      ref={ref}>
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
    // </div>
  );
};

export default NavVertical;
