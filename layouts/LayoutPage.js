import isTouchDevice from "../functions/isTouchDevice";
import ButtonScrollTo from "../components/ButtonScrollTo";
import NavVertical from "../components/NavVertical";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import NavTop from "../components/NavTop";
import Meta from "../components/Meta";

const widthTresh = 768; // lg tailwind default - md = 768;
let prevWidth = 0;

const LayoutPage = ({ pageId = "top", children, className, pageMeta }) => {
  const [showNavVertical, setShowNavVertical] = useState(false);
  const [showNavTop, setShowNavTop] = useState(false);
  const { width } = useWindowSize();
  const isTouch = isTouchDevice();
  const ref = useRef(null);

  // onMount, set the correct nav UI
  useEffect(() => {
    setShowNavTop(isTouch ? true : false);
    setShowNavVertical(isTouch ? false : true);
  }, [isTouch]);

  // handle transitions to open and close vertical navbar
  if (prevWidth !== width) {
    if (showNavVertical && width < widthTresh) {
      setShowNavTop(true);
      setShowNavVertical(false);
    }
    if (!showNavVertical && width > widthTresh) {
      setShowNavTop(false);
      setShowNavVertical(true);
    }
    prevWidth = width;
  }

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
          } mx-auto flex-1 px-4 py-4 ${className}`}
          ref={ref}
          id={pageId}>
          {children}
        </div>
        <div className="fixed scrollLock-compensation right-4 bottom-4">
          <ButtonScrollTo targetId={pageId} parentRef={ref} />
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
