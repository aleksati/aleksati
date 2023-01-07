import { useRouter } from "next/router";
import Icon from "./Icon";
import MyLink from "./MyLink";

const tabs = [
  { key: "about", title: "ABOUT", categories: [] },
  {
    key: "posts",
    title: "POSTS",
    categories: [
      {
        key: "music-tech",
        icon: "x",
        title: "Music tech",
      },
      {
        key: "networked-music",
        icon: "x",
        title: "Networked Music",
      },
      {
        key: "web-dev",
        icon: "x",
        title: "Web Development",
      },
    ],
  },
  {
    key: "projects",
    title: "PROJECTS",
    categories: [
      {
        key: "music-tech",
        icon: "x",
        title: "The Holy Mountain",
      },
      {
        key: "networked-music",
        icon: "x",
        title: "Networked Music",
      },
      {
        key: "web-dev",
        icon: "x",
        title: "Web Development",
      },
    ],
  },
  { key: "research", title: "RESEARCH", categories: [] },
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
            <MyLink
              key={tab.key}
              href={tab.key}
              type="page"
              active={tab.key === page}>
              {tab.title}
            </MyLink>
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
