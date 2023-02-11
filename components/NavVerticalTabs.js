import { useRouter } from "next/router";
import Icon from "./Icon";
import MyLink from "./MyLink";

const tabs = [
  { key: "about", title: "about", categories: [], icon: "about" },
  { key: "posts", title: "posts", categories: [], icon: "filter" },
  { key: "projects", title: "projects", categories: [], icon: "issue" },
  { key: "research", title: "research", categories: [], icon: "x" },
];

const NavVerticalTabs = () => {
  // find the ending of the current url route.
  const router = useRouter();
  const path = router.pathname.slice(1);
  const currTab = tabs.filter((tab) => tab.key === path);
  const page = currTab.length ? currTab[0].key : "";

  return (
    <>
      {tabs.map((tab, index) => {
        // const brdr = index === 0 ? "" : "pt-2 pb-2 border-t";
        const brdr = "";
        return (
          <div className={`space-y-2 ${brdr}`} key={tab.key}>
            <div className="flex space-x-1 items-center justify-start">
              {/* <Icon id={tab.icon} iconSize={"text-sm"} /> */}
              <MyLink
                className={"text-sm"}
                key={tab.key}
                href={tab.key}
                type="page"
                active={tab.key === page}>
                {tab.title}
              </MyLink>
            </div>
            {tab.categories
              ? tab.categories.map((cat) => (
                  <div
                    key={cat.key}
                    className="flex space-x-2 items-center justify-start">
                    <Icon id={cat.icon} iconSize={"text-md"} />
                    <MyLink
                      key={cat.key}
                      href={cat.key}
                      type="page"
                      active={cat.key === page}>
                      {cat.title}
                    </MyLink>
                  </div>
                ))
              : null}
          </div>
        );
      })}
    </>
  );
};

export default NavVerticalTabs;
