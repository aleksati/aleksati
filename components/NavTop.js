import ButtonIcon from "./ButtonIcon";
import Link from "next/link";

const NavTop = ({ onToggleNavVertical, showNavVertical }) => {
  return (
    <nav
      className="z-50 fixed w-full bg-primary-light dark:bg-primary-dark"
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
          />
        </div>
      </div>
    </nav>
  );
};

export default NavTop;
