import IconScrollTo from "../components/IconScrollTo";
import React, { useRef } from "react";
import Meta from "../components/Meta";
import Nav from "../templates/Nav";

const LayoutPage = ({
  pageId = "top",
  children,
  className,
  showSearchAndTheme,
  showProfile,
  showMenu,
  pageMeta,
}) => {
  const ref = useRef(null);
  return (
    <div className="flex">
      <Meta {...pageMeta} />
      <Nav
        showProfile={showProfile}
        showSearchAndTheme={showSearchAndTheme}
        showMenu={showMenu}
      />
      <div
        className={`min-h-screen container mx-auto p-2 px-4 pb-12 ${className}`}
        ref={ref}
        id={pageId}
      >
        {children}
        <IconScrollTo targetId={pageId} parentRef={ref} />
      </div>
    </div>
  );
};

export default LayoutPage;
