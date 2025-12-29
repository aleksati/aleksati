import { useClickOutside } from "../hooks/useClickOutside";
import ButtonTheme from "./ButtonTheme";
import { useEffect } from "react";
import MyLink from "./MyLink";

type Props = {
  onToggleNavVerticalToc: () => void;
  toc: TocList;
};

// const moctoc: TocList = [
//   { depth: 1, text: "Step 1 - hey" },
//   { depth: 1, text: "Step 2 - hey me" },
//   { depth: 1, text: "Step 3 - hey" },

const NavVerticalToc = ({ onToggleNavVerticalToc, toc }: Props) => {
  const [ref, isClickOutside] = useClickOutside<HTMLDivElement>();

  // This is for closing the menu when clicking outside of the menu.
  useEffect(() => {
    if (isClickOutside) onToggleNavVerticalToc();
  }, [isClickOutside, onToggleNavVerticalToc]);

  // get the current route after /pages and remove the first "/" with slice
  // const route: string = useRouter().pathname.slice(1);
  // remove /[post] stuff on nested rutes, and remaining "/" at the end
  // const firstRoute: string = route.split("[")[0].split("/")[0];
  // default to about
  // const currRoute: string = firstRoute.length ? firstRoute : "";

  return (
    <div
      className={`z-50 fixed min-h-screen border-r border-secondary bg-primary-light dark:bg-primary-dark dark:border-secondary-dark w-72 p-4`}
      ref={ref}>
      {/* was ": flex-none" before */}
      <div className="w-64 fixed">
        {/* was w-56 */}
        <div className="flex-col space-y-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-end">
              <div className="flex space-x-1 font-bold">
                <p>Table of contents</p>
              </div>
              <div></div>
              <ButtonTheme />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="space-y-4 border-gray-200 dark:border-gray-600">
              <ol className="space-y-4 list-decimal leading-5">
                {toc.map((item, idx) => {
                  // only incude H1 headers.
                  if (item.depth !== 1) return;

                  // convert all spaces to "-" and text to lowercase.
                  const headerID: string = item.text
                    .toLowerCase()
                    .split(" ")
                    .join("-");

                  // First <li> is the page title
                  return (
                    <li
                      key={headerID}
                      className="ml-4 space-x-1 items-center justify-start">
                      <MyLink
                        href={`#${idx === 0 ? "pageTitle" : headerID}`}
                        type="toc">
                        {item.text}
                      </MyLink>
                    </li>
                  );
                })}
                {/* Always have comments at the end. */}
                <li
                  key="comment"
                  className="ml-4 space-x-1 items-center justify-start">
                  <MyLink href={`#leave-a-comment`} type="nav">
                    Comments
                  </MyLink>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavVerticalToc;
