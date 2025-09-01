import { useRouter } from "next/router";
import useWindowSize from "../hooks/useWindowSize";
import ButtonIcon from "./ButtonIcon";
import Link from "next/link";
import Search from "./Search";
import ModalSearch from "./ModalSearch";

type Props = {
  onToggleNavVertical: () => void;
  showNavVertical: boolean;
  onToggleNavVerticalToc: () => void;
  showNavVerticalToc: boolean;
  isPostWithToc: boolean;
};

const NavTop = ({
  onToggleNavVertical,
  showNavVertical,
  showNavVerticalToc,
  onToggleNavVerticalToc,
  isPostWithToc,
}: Props) => {
  // to determine which Search bar to use
  const { width } = useWindowSize();
  // the width of the screen when the Seach bar goes from desktop to mobile version
  const widthTresh: number = 1024; // tailwind md; var 768 // lg 1024

  // to set the curren route in the title of the page
  // get the current route after /pages and remove the first "/" with slice
  const route: string = useRouter().pathname.slice(1);
  // remove /[post] stuff on nested rutes, and remaining "/" at the end
  let firstRoute: string = route.split("[")[0].split("/")[0];
  // default to about
  const currRoute: string = firstRoute.length ? firstRoute : "";

  return (
    <nav
      className="z-40 fixed w-full bg-primary-light dark:bg-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      <div className="flex items-center justify-between p-4">
        <div className="flex space-x-1 -mt-1 lg:-mt-2 font-bold w-1/3">
          <Link href={`/`} className="hover:cursor-pointer">
            aleksati.net
          </Link>
          {currRoute ? <p>/</p> : null}
          <Link href={`/${currRoute}`} className="hover:cursor-pointer">
            {currRoute}
          </Link>
        </div>
        <div className="flex container w-1/3 px-2">
          {/* on desktop */}
          {width > widthTresh && <Search />}
        </div>
        <div className="flex justify-end w-1/3 space-x-2">
          {/* on mobile */}
          {width < widthTresh && <ModalSearch />}
          <ButtonIcon
            iconId={showNavVertical ? "x" : "threedots"}
            onClick={onToggleNavVertical}
            aria-label="Menu"
          />
          {isPostWithToc ? (
            <ButtonIcon
              iconId={showNavVerticalToc ? "x" : "toc"}
              onClick={onToggleNavVerticalToc}
              aria-label="Table of contents"
            />
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default NavTop;
