import { useRouter } from "next/router";
import Icon from "./Icon";
import MyLink from "./MyLink";

const tabs = [
  { key: "about", title: "About", categories: [], icon: "about" },
  { key: "posts", title: "Posts", categories: [], icon: "filter" },
  { key: "projects", title: "Projects", categories: [], icon: "issue" },
  { key: "research", title: "Publications", categories: [], icon: "x" },
];

const NavVerticalTabs = () => {
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
          <div className={`space-y-2 ${brdr}`}>
            <div
              key={tab.key}
              className="flex space-x-1 items-center justify-start">
              <Icon id={tab.icon} iconSize={"text-md"} />
              <MyLink
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
