import useCurrRoute from "../hooks/useCurrRoute";
import ButtonIcon from "./ButtonIcon";
import Link from "next/link";
// import MyLink from "./MyLink";

const NavTop = ({ onToggleNavVertical, showNavVertical }) => {
  const route = useCurrRoute();
  const currPage = route ? route : "about";

  return (
    <nav
      className="z-50 fixed w-full bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar"
    >
      <div className="flex p-4 items-center space-x-1">
        {/* This is the path link at the top */}
        <p className="font-bold">/</p>
        <Link href={`/${currPage}`} className="font-bold hover:cursor-pointer">
          {currPage}
        </Link>
        {/* <MyLink active={true} type="nav" href={`/${currPage}`}>
          {currPage}
        </MyLink> */}
      </div>
      {/* fixed class, because it messes with the transition from navtop to nav vertical (just a tiny bit) */}
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
