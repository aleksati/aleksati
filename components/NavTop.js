import ButtonIcon from "./ButtonIcon";
import Link from "next/link";

const NavTop = ({ onToggleNavVertical, showNavVertical }) => {
  return (
    <nav
      className="z-50 fixed w-full bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      <div className="flex p-4 items-center justify-between">
        <h1>
          <Link href="/" className="font-bold">
            aleksati.net
          </Link>
        </h1>
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
