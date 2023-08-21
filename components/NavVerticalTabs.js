import MyLink from "./MyLink";
import { useRouter } from "next/router";
import { NAV_TABS } from "../config";

const NavVerticalTabs = () => {
  // find the ending of the current url route.
  // underline the current page the user is on
  // if its a post or work, then just underline post
  const router = useRouter();
  const path = router.pathname.slice(1);

  // refactor this so that its just "if there is "[", remove the rest.
  // let posts = navTabs.filter(item => item.key === "posts")[0]
  // let works = navTabs.filter(item => item.key === "works")[0]
  const route = path.replace(`/[post]`, "").replace("/[work]", "");

  const currTab = tabs.filter((tab) => tab.key === route);
  const currRoute = currTab.length ? currTab[0].key : "";

  // I have the landing page (index.js) to about, so it defaults to the about page
  const page = currRoute ? currRoute : "about";

  return (
    <div className="space-y-4">
      {/* https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript */}
      {navTabs.map((tab, index) => (
        <div className={`space-y-2`} key={tab.key}>
          <div className="flex space-x-1 items-center justify-start">
            <MyLink active={tab.key === page} href={`/${tab.key}`} type="nav">
              {tab.title}
            </MyLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavVerticalTabs;
