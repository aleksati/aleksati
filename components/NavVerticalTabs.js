import MyLink from "./MyLink";
import { useRouter } from "next/router";
import { NAV_TABS } from "../config";

const NavVerticalTabs = () => {
  // get the current route after /pages and remove the first "/" with slice
  const route = useRouter().pathname.slice(1);
  // remove /[post] stuff on nested rutes, and remaining "/" at the end
  let firstRoute = route.split("[")[0].split("/")[0];
  // default to about
  const currRoute = firstRoute.length ? firstRoute : "about";

  return (
    <div className="space-y-4">
      {/* https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript */}
      {Object.entries(NAV_TABS).map(([id, url], index) => (
        <div className={`space-y-2`} key={url}>
          <div className="flex space-x-1 items-center justify-start">
            <MyLink active={url === currRoute} href={`/${url}`} type="nav">
              {url}
            </MyLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavVerticalTabs;
