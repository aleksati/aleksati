import useCurrRoute from "../hooks/useCurrRoute";
import ButtonIcon from "./ButtonIcon";
import Link from "next/link";

const NavTop = ({ onToggleNavVertical, showNavVertical }) => {
  const route = useCurrRoute();
  const currPage = route ? route : "about";
  return (
    <nav
      className="z-50 fixed w-full bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      <div className="flex p-4 items-center">
        <Link href="/" className="font-bold items-center hover:cursor-pointer">
          aleksati.net
        </Link>
        <p className="font-bold items-center">&nbsp;/ {currPage}</p>
      </div>
      {/* fixed because it messes with the transition from navtop to nav vertical (just a tiny bit) */}
      <div className="fixed top-3 right-4">
        <ButtonIcon
          iconId={showNavVertical ? "x" : "threedots"}
          onClick={onToggleNavVertical}
        />
      </div>
    </nav>
  );
};

export default NavTop;
