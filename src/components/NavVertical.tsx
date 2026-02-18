import { useClickOutside } from "../hooks/useClickOutside";
import ButtonTheme from "./ButtonTheme";
import { useEffect } from "react";
import Link from "next/link";
import RSSLink from "./RSSLink";
// import { useRouter } from "next/router";
import { NAV_TABS } from "../config";
import MyLink from "./MyLink";
import ButtonIcon from "./ButtonIcon";

type Props = {
  onToggleNavVertical?: () => void;
};

const NavVertical = ({ onToggleNavVertical }: Props) => {
  const [ref, isClickOutside] = useClickOutside<HTMLDivElement>();

  // This is for closing the menu when clicking outside of the menu.
  useEffect(() => {
    if (isClickOutside) onToggleNavVertical();
  }, [isClickOutside, onToggleNavVertical]);

  // get the current route after /pages and remove the first "/" with slice
  // const route: string = useRouter().pathname.slice(1);
  // remove /[post] stuff on nested rutes, and remaining "/" at the end
  // const firstRoute: string = route.split("[")[0].split("/")[0];
  // default to about
  // const currRoute: string = firstRoute.length ? firstRoute : "";

  return (
    <div
      className={`z-40 fixed min-h-screen border-secondary bg-primary-light dark:bg-primary-dark dark:border-secondary-dark w-56 p-4`}
      ref={ref}
    >
      {/* was ": flex-none" before */}
      <div className="w-56 fixed">
        {/* was w-56 */}
        <div className="flex-col space-y-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-end">
              <div className="flex space-x-1 font-bold">
                <Link href="/">
                  <p>aleksati.net</p>
                </Link>
                {/* {currRoute ? <p>/</p> : null} */}
                {/* <Link
                  href={`/${currRoute}`}
                  className="font-bold flex items-start space-x-2"
                >
                  <p>{currRoute}</p>
                </Link> */}
              </div>
              {/* <div></div> */}
              <ButtonIcon
                iconId={"x"}
                onClick={onToggleNavVertical}
                aria-label="Menu"
                className="mt-1"
              />
              {/* <ButtonTheme /> */}
            </div>
          </div>
          <div className="flex flex-col">
            {/* This are the items in the nav */}
            <div className="space-y-4">
              {Object.entries(NAV_TABS).map(([id, url], index) => (
                // https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
                // <div className={`space-y-2`} key={url}>
                //  <div
                //   key={url}
                //   className="flex space-x-1 items-center justify-start">
                //   <MyLink active={url === currRoute} href={`/${url}`} type="nav">
                //     {url}
                //   </MyLink>
                // </div>
                <div
                  key={url}
                  className="flex space-x-1 items-center justify-start"
                >
                  <MyLink href={`/${url}`} type="nav">
                    {id}
                  </MyLink>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <ButtonTheme />
            {/* <p>Theme</p> */}
          </div>
          <div>
            <RSSLink />
          </div>
        </div>
      </div>
      {/* <div className="fixed bottom-6 left-4">
        <div className="flex space-x-4 z-50">
          <RSSLink />
        </div>
      </div> */}
    </div>
  );
};

export default NavVertical;
