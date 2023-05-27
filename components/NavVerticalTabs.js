import useCurrRoute from "../hooks/useCurrRoute";
import MyLink from "./MyLink";

const tabs = [
  { key: "about", title: "about", categories: [], icon: "about" },
  { key: "posts", title: "posts", categories: [], icon: "filter" },
  // { key: "projects", title: "projects", categories: [], icon: "issue" },
  { key: "research", title: "research", categories: [], icon: "x" },
];

const NavVerticalTabs = () => {
  const route = useCurrRoute();

  const currTab = tabs.filter((tab) => tab.key === route);
  const currRoute = currTab.length ? currTab[0].key : "";

  // I have the landing page (index.js) to about, so it defaults to the about page
  const page = currRoute ? currRoute : "about";

  return (
    <div className="space-y-4">
      {tabs.map((tab, index) => {
        return (
          <div className={`space-y-2`} key={tab.key}>
            <div className="flex space-x-1 items-center justify-start">
              {/* <Icon id={tab.icon} iconSize={"text-sm"} /> */}
              <MyLink active={tab.key === page} href={`/${tab.key}`} type="nav">
                {tab.title}
              </MyLink>
            </div>
            {/* If the categories has sub-categories */}
            {/* Not in use atm */}
            {/* {tab.categories
              ? tab.categories.map((cat) => (
                  <div
                    key={cat.key}
                    className="flex space-x-2 items-center justify-start">
                    <Icon id={cat.icon} iconSize={"text-md"} />
                    <MyLink
                      active={cat.key === page}
                      href={`/${cat.key}`}
                      key={cat.key}
                      type="nav">
                      {cat.title}
                    </MyLink>
                  </div>
                ))
              : null} */}
          </div>
        );
      })}
    </div>
  );
};

export default NavVerticalTabs;
