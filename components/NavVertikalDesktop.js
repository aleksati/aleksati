import { useState } from "react";
import MyLink from "./MyLink";
import Footer from "../templates/Footer";

const tabs = ["posts", "projects", "research", "about"];

const NavVertikalDesktop = () => {
  const [activeCat, setActiveCat] = useState("blog");
  const handleClick = (e) => setActiveCat(e.target.innerHTML);

  return (
    <nav
      className="z-50 w-56 fixed min-h-screen bg-primary-light dark:bg-primary-dark border-r border-primary-light dark:border-primary-dark"
      aria-label="Navbar"
      role="toolbar">
      <div className="py-4 flex flex-col min-h-screen justify-between">
        <div className="mx-auto text-xl space-y-4 w-1/2">
          <p className="m-2 font-bold">tidemann</p>
          {tabs.map((tab) => (
            <MyLink
              key={tab}
              type="tab"
              onClick={handleClick}
              active={tab === activeCat}>
              {tab}
            </MyLink>
          ))}
        </div>

        <div className="text-sm flex items-center justify-center">
          <Footer
            author={"Aleksander Tidemann"}
            date={new Date().getFullYear()}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavVertikalDesktop;
