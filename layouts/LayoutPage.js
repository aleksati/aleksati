import IconScrollTo from "../components/IconScrollTo";
import NavVertikalDesktop from "../components/NavVertikalDesktop";
import NavTop from "../components/NavTop";
import React, { useRef } from "react";
import Meta from "../components/Meta";

const LayoutPage = ({
  pageId = "top",
  children,
  className,
  showSearchAndTheme,
  showPostFilter,
  pageMeta,
  categories,
}) => {
  const ref = useRef(null);
  return (
    <div>
      <Meta {...pageMeta} />
      <NavVertikalDesktop />
      <NavTop
        showSearchAndTheme={showSearchAndTheme}
        showPostFilter={showPostFilter}
        categories={categories}
      />
      <div
        className={`min-h-screen container mx-auto pb-12 ${className}`}
        ref={ref}
        id={pageId}>
        {children}
        <IconScrollTo targetId={pageId} parentRef={ref} />
      </div>
    </div>
  );
};

export default LayoutPage;
