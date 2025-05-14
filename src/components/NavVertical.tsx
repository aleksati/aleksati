import { useClickOutside } from "../hooks/useClickOutside";
import NavVerticalTabsAndToc from "./NavVerticalTabsAndToc";
import ButtonTheme from "./ButtonTheme";
import { useEffect } from "react";
import Search from "./Search";
import Link from "next/link";
import RSSLink from "./RSSLink";
import { useRouter } from "next/router";

type Props = {
  showNavTop: boolean;
  onToggleNavVertical?: () => void;
  isPostWithToc: boolean;
  toc: TocList;
};

const NavVertical = ({
  showNavTop,
  onToggleNavVertical,
  toc,
  isPostWithToc,
}: Props) => {
  const [ref, isClickOutside] = useClickOutside<HTMLDivElement>();

  useEffect(() => {
    if (isClickOutside && showNavTop) onToggleNavVertical();
  }, [isClickOutside, onToggleNavVertical, showNavTop]);

  // get the current route after /pages and remove the first "/" with slice
  const route: string = useRouter().pathname.slice(1);
  // remove /[post] stuff on nested rutes, and remaining "/" at the end
  const firstRoute: string = route.split("[")[0].split("/")[0];
  // default to about
  const currRoute: string = firstRoute.length ? firstRoute : "";

  return (
    <div
      className={`z-50 min-h-screen border-r border-secondary bg-primary-light dark:bg-primary-dark dark:border-secondary-dark ${
        showNavTop ? "fixed" : "flex-none"
      } w-72 p-4`} // was 64
      ref={ref}>
      <div className="w-56 fixed mt-0">
        <div className="flex-col space-y-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-end">
              <div className="flex space-x-1 font-bold">
                <Link href="/">
                  <p>aleksati.net</p>
                </Link>
                {currRoute ? <p>/</p> : null}
                <Link href={`/${currRoute}`} className="font-bold flex items-start space-x-2">
                  <p>{currRoute}</p>
                </Link>
              </div>
              <div></div>
              <ButtonTheme />
            </div>
          </div>
          <Search />
          <div className="flex flex-col pt-14">
            <NavVerticalTabsAndToc toc={toc} isPostWithToc={isPostWithToc} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-6 left-4">
        <div className="flex space-x-4 z-50">
          <RSSLink />
        </div>
      </div>
    </div>
  );
};

export default NavVertical;
