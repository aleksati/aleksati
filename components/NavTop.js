import { useState, useCallback, useRef } from "react";
import ButtonIcon from "./ButtonIcon";
import ButtonTheme from "./ButtonTheme";
import Search from "./Search";
import Link from "next/link";

const NavTop = ({ onToggleNavVertical, showNavVertical }) => {
  const [isSearch, setIsSearch] = useState(false);
  const searchRef = useRef(null);

  const handleSearchToggle = () => setIsSearch((prevState) => !prevState);

  const handleMobileClickOutside = useCallback(() => {
    setIsSearch(false);
  }, [setIsSearch]);

  return (
    <nav
      className="z-10 fixed w-full bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      <div className="flex p-4 items-center justify-between">
        <div className="justify-start space-x-2 items-center flex">
          <Link href="/" className="font-bold text-base items-center">
            aleksati.net
          </Link>
        </div>
        <div>
          <ButtonIcon
            iconId={showNavVertical ? "x" : "threedots"}
            onClick={onToggleNavVertical}
            iconSize="text-2xl"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavTop;
