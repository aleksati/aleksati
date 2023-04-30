import { useState, useEffect, useRef, useCallback } from "react";
import { useMouseHover } from "../hooks/useMouseHover";
import NavVerticalTabs from "./NavVerticalTabs";
import ButtonTheme from "./ButtonTheme";
import Search from "./Search";
import Link from "next/link";
import { useClickOutside } from "../hooks/useClickOutside";

// make hook use

const NavVertical = ({ showNavTop, onToggleNavVertical }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [ref, isClickOutside] = useClickOutside();

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  return (
    <div
      className="z-20 flex-none border-r border-secondary space-y-6 p-4 pt-4 min-h-screen items-start justify-start"
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
  );
};

export default NavVertical;
