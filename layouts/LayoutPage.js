import IconScrollTo from "../components/IconScrollTo";
import NavVertikalDesktop from "../components/NavVertikalDesktop";
import NavTop from "../components/NavTop";
import React, { useRef } from "react";
import Meta from "../components/Meta";

const LayoutPage = ({
  pageId = "top",
  children,
  className,
  showSearch,
  showPostFilter,
  showTheme,
  showBackButton,
  pageMeta,
  categories,
}) => {
  const ref = useRef(null);
  return (
    <div>
      <Meta {...pageMeta} />
      {/* <NavVertikalDesktop /> */}
      <div
        className={`min-h-screen container mx-auto px-4 pb-12 ${className}`}
        ref={ref}
        id={pageId}>
        <NavTop
          showSearch={showSearch}
          showTheme={showTheme}
          showPostFilter={showPostFilter}
          showBackButton={showBackButton}
          categories={categories}
        />
        {children}
        <IconScrollTo targetId={pageId} parentRef={ref} />
      </div>
    </div>
  );
};

export default LayoutPage;
