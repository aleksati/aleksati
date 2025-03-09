import { useClickOutside } from "../hooks/useClickOutside";
import NavVerticalTabs from "./NavVerticalTabs";
import ButtonTheme from "./ButtonTheme";
import { useEffect } from "react";
import Search from "./Search";
import Link from "next/link";
import RSSLink from "./RSSLink";
import Icon from "./Icon";

type Props = {
  showNavTop: boolean;
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
      <div className="w-56 fixed mt-0">
        <div className="flex-col space-y-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-end">
              <Link href="/" className="font-bold flex items-start space-x-2">
                {/* <Icon id="wave" iconSize="sm" /> */}
                <p>aleksati.net</p>
              </Link>
              <div></div>
              <ButtonTheme />
            </div>
          </div>
          <Search />
          <div className="flex flex-col pt-14">
            <NavVerticalTabs />
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
