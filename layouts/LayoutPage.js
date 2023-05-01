import ButtonScrollTo from "../components/ButtonScrollTo";
import isTouchDevice from "../functions/isTouchDevice";
import NavVertical from "../components/NavVertical";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import NavTop from "../components/NavTop";
import { useRouter } from "next/router";
import Meta from "../components/Meta";

const widthTresh = 768; // lg tailwind default - md = 768;
let prevWidth = 0;

const LayoutPage = ({ pageId = "top", children, className, pageMeta }) => {
  const [showNavVertical, setShowNavVertical] = useState(false);
  const [widthBelowThresh, setWidthBelowThresh] = useState();
  const [showNavTop, setShowNavTop] = useState(false);
  const { width } = useWindowSize();
  const isTouch = isTouchDevice();
  const pageTopRef = useRef();

  // handle browser size transitions to open and close the navbars
  // set state when transitioning to avoid uneccessary rendering.
  if (prevWidth !== width) {
    setWidthBelowThresh(width < widthTresh ? true : false);
    prevWidth = width;
  }

  // also close the verical nav on touch if navigating to new url
  const router = useRouter();
  const path = router.query;
  // set navbars based on the current state and window width
  useEffect(() => {
    setShowNavTop(widthBelowThresh ? true : false);
    setShowNavVertical(widthBelowThresh ? false : true);
  }, [widthBelowThresh, path]);

  const handleToggleNavVertical = () =>
    setShowNavVertical((prevState) => !prevState);

  return (
    <div className="text-base items-center">
      <Meta {...pageMeta} />
      <div className="min-h-screen flex">
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
          className={`container ${
            showNavTop && showNavVertical ? "blur-sm" : null
          } mx-auto flex-1 px-4 ${showNavTop ? "py-16" : "py-8"} ${className}`}
          id={pageId}
          ref={pageTopRef}>
          {children}
        </div>
        <div className="fixed right-4 bottom-4">
          <ButtonScrollTo targetId={pageId} parentRef={pageTopRef} />
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
