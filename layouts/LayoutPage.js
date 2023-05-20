import ButtonScrollTo from "../components/ButtonScrollTo";
import { useIsMounted } from "../hooks/useIsMounted";
import NavVertical from "../components/NavVertical";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import NavTop from "../components/NavTop";
import Meta from "../components/Meta";

import { useRouter } from "next/router";

const widthTresh = 768; // tailwind md = 768;
let prevWidth = 0;

const LayoutPage = ({ pageId = "top", children, className, pageMeta }) => {
  const [showNavVertical, setShowNavVertical] = useState(false);
  const [widthBelowThresh, setWidthBelowThresh] = useState(false);
  const [showNavTop, setShowNavTop] = useState(false);
  const [isMounted, setIsMounted] = useIsMounted();
  const { width } = useWindowSize();
  const pageTopRef = useRef();

  // handle browser size transitions to open+close the navbars
  // to avoid uneccessary rendering.
  if (prevWidth !== width) {
    // when changing urls on the site, this component does not
    // necessarily re-render because its used on all pages. However,
    // I need to close the verical nav on touch if navigating to new url.
    // to fix this, I evaluate !width as false to force re-render the component
    // on a new route, after the isMount is true.
    setWidthBelowThresh(!width || width < widthTresh);
    prevWidth = width;
  }

  // also, when changing urls the the site from the search(!),
  // I need to force re-render this component. Use path for this.
  const router = useRouter();
  const path = router.pathname;

  // on mount or a window size transition, re-evaluate which navbars
  // should be showing.
  useEffect(() => {
    if (isMounted) {
      setShowNavTop(widthBelowThresh ? true : false);
      setShowNavVertical(widthBelowThresh ? false : true);
    }
  }, [isMounted, widthBelowThresh, path]);

  const handleToggleNavVertical = () =>
    setShowNavVertical((prevState) => !prevState);

  return (
    <>
      <Meta {...pageMeta} />
      <div className="min-h-screen max-w-6xl flex">
        {showNavTop ? (
          <NavTop
            onToggleNavVertical={handleToggleNavVertical}
            showNavVertical={showNavVertical}
          />
        ) : null}
        {showNavVertical ? (
          <NavVertical
            showNavTop={showNavTop}
            onToggleNavVertical={handleToggleNavVertical}
          />
        ) : null}
        <div
          className={`container pb-4 ${
            showNavTop && showNavVertical ? "blur-sm" : null
          } mx-auto flex-1 overflow-hidden px-4 ${
            showNavTop ? "pt-20" : "pt-6"
          } ${className}`}
          id={pageId}
          ref={pageTopRef}>
          {children}
        </div>
        <div className="fixed right-4 bottom-4">
          <ButtonScrollTo targetId={pageId} parentRef={pageTopRef} />
        </div>
      </div>
    </>
  );
};

export default LayoutPage;
