import { useClickOutside } from "../hooks/useClickOutside";
import NavVerticalTabs from "./NavVerticalTabs";
import ButtonTheme from "./ButtonTheme";
import { useEffect } from "react";
import Search from "./Search";
import Link from "next/link";
import RSSLink from "./RSSLink";

type Props = {
  showNavTop: Boolean;
  onToggleNavVertical?: () => void;
};

const NavVertical = ({ showNavTop, onToggleNavVertical }: Props) => {
  const [ref, isClickOutside] = useClickOutside<HTMLDivElement>();

  useEffect(() => {
    if (isClickOutside && showNavTop) onToggleNavVertical();
  }, [isClickOutside, onToggleNavVertical, showNavTop]);

  return (
    <div
      className={`z-50 min-h-screen border-r border-secondary bg-primary-light dark:bg-primary-dark dark:border-secondary-dark ${
        showNavTop ? "fixed" : "flex-none"
      } w-64 p-4`}
      ref={ref}>
      <div className="w-56 fixed mt-2">
        <div className="flex-col space-y-6">
          <div className="flex flex-col">
            <div className="flex justify-between items-start">
              <Link href="/" className="font-bold">
                aleksati.net
              </Link>
              <ButtonTheme />
            </div>
          </div>
          <Search />
          <div className="flex flex-col pt-14 space-y-4">
            <NavVerticalTabs />
            <RSSLink />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavVertical;
