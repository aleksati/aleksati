import { useRouter } from "next/router";
import Icon from "./Icon";
import MyLink from "./MyLink";

const tabs = [
  { key: "about", title: "about", categories: [], icon: "about" },
  { key: "posts", title: "posts", categories: [], icon: "filter" },
  { key: "music", title: "music", categories: [], icon: "issue" },
  { key: "research", title: "research", categories: [], icon: "x" },
];

const NavVerticalTabs = () => {
  // find the ending of the current url route.
  const router = useRouter();
  const path = router.pathname.slice(1);
  const route = path.replace("/[post]", "");
  const currTab = tabs.filter((tab) => tab.key === route);
  const page = currTab.length ? currTab[0].key : "";

  return (
    <div className="space-y-4">
      {tabs.map((tab, index) => {
        // const brdr = index === 0 ? "" : "pt-2 pb-2 border-t";
        const brdr = "";
        return (
          <div className={`space-y-2 ${brdr}`} key={tab.key}>
            <div className="flex space-x-1 items-center justify-start">
              {/* <Icon id={tab.icon} iconSize={"text-sm"} /> */}
              <MyLink
                active={tab.key === page}
                href={`/${tab.key}`}
                key={tab.key}
                type="nav">
                {tab.title}
              </MyLink>
            </div>
            {/* If the categories has sub-categories */}
            {tab.categories
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
              : null}
          </div>
        );
      })}
    </div>
  );
};

export default NavVerticalTabs;
