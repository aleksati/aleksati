import { useRouter } from "next/router";
import ButtonIcon from "./ButtonIcon";
import Link from "next/link";

const NavTop = ({ onToggleNavVertical, showNavVertical }) => {
  // get the current route after /pages and remove the first "/" with slice
  const route = useRouter().pathname.slice(1);
  // remove /[post] stuff on nested rutes, and remaining "/" at the end
  let firstRoute = route.split("[")[0].split("/")[0];
  // default to about
  const currRoute = firstRoute.length ? firstRoute : "about";

  return (
    <nav
      className="z-50 fixed w-full bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      <div className="flex p-4 items-center space-x-1">
        {/* This is the path link at the top */}
        <p className="font-bold">/</p>
        <Link href={`/${currRoute}`} className="font-bold hover:cursor-pointer">
          {currRoute}
        </Link>
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
