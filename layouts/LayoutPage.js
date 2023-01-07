import NavVertical from "../components/NavVertical";
import IconScrollTo from "../components/IconScrollTo";
import useWindowSize from "../hooks/useWindowSize";
import NavTop from "../components/NavTop";
import Meta from "../components/Meta";
import { useRef } from "react";

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
  const { width } = useWindowSize();

  return (
    <div className="text-base">
      <Meta {...pageMeta} />
      <NavTop
        showSearch={showSearch}
        // showTheme={showTheme}
        // showPostFilter={showPostFilter}
        // showBackButton={showBackButton}
        // categories={categories}
      />
      {width > "1060" ? <NavVertical /> : null}
      {/* Compensate for fixed NavTop */}
      <div className="pt-20">
        <div
          className={`min-h-screen container mx-auto px-4 pb-12 ${className}`}
          ref={ref}
          id={pageId}>
          {children}
          <IconScrollTo targetId={pageId} parentRef={ref} />
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
