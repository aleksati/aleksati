import { NAV_TABS } from "../config";
import MyLink from "./MyLink";

// const moctoc: TocList = [
//   { depth: 1, text: "Step 1 - hey" },
//   { depth: 1, text: "Step 2 - hey me" },
//   { depth: 1, text: "Step 3 - hey" },

type Props = {
  toc: TocList;
  isPostWithToc: boolean;
};

const NavVerticalTabsAndToc = ({ toc, isPostWithToc = false }: Props) => {
  // // get the current route after /pages and remove the first "/" with slice
  // const route: string = useRouter().pathname.slice(1);
  // // remove /[post] stuff on nested rutes, and remaining "/" at the end
  // const firstRoute: string = route.split("[")[0].split("/")[0];
  // // default to about
  // const currRoute: string = firstRoute.length ? firstRoute : "";

  return (
    <>
      {isPostWithToc ? (
        <div className="space-y-4 border-gray-200 dark:border-gray-600">
          <p className="border-b pb-1 border-gray-200 dark:border-gray-600">Table of contents</p>
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
                  className="ml-4 text-sm space-x-1 items-center justify-start">
                  <MyLink href={`#${idx === 0 ? "pageTitle" : headerID}`} type="toc">
                    {item.text}
                  </MyLink>
                </li>
              );
            })}
            {/* Always have comments at the end. */}
            <li
              key="comment"
              className="ml-4 text-sm space-x-1 items-center justify-start">
              <MyLink href={`#leave-a-comment`} type="nav">
                Comments
              </MyLink>
            </li>
          </ol>
        </div>
      ) : (
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
              className="flex space-x-1 items-center justify-start">
              <MyLink href={`/${url}`} type="nav">
                {url}
              </MyLink>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NavVerticalTabsAndToc;
