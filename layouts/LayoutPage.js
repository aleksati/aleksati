import isTouchDevice from "../functions/isTouchDevice";
import IconScrollTo from "../components/IconScrollTo";
import NavVertical from "../components/NavVertical";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import NavTop from "../components/NavTop";
import Meta from "../components/Meta";

const widthTresh = 768; // md tailwind default
let prevWidth = 0;

const LayoutPage = ({
  pageId = "top",
  children,
  className,
  pageMeta,
  showSearch = true,
}) => {
  const [navIsShown, setNavIsShown] = useState(true);
  const ref = useRef(null);
  const isMobile = isTouchDevice();
  const { width } = useWindowSize();

  // handle transitions to open and close vertical navbar
  if (prevWidth !== width) {
    if (navIsShown && width < widthTresh) setNavIsShown(false);
    if (!navIsShown && width > widthTresh) setNavIsShown(true);
    prevWidth = width;
  }

  useEffect(() => {
    setNavIsShown(isMobile ? false : true);
  }, [isMobile]);

  const handleShowVerticalNav = () => setNavIsShown((prevState) => !prevState);

  return (
    <div className="text-base items-center">
      <Meta {...pageMeta} />
      <NavTop
        onShowVerticalNav={handleShowVerticalNav}
        isMobileSearch={width < widthTresh}
      />
      {navIsShown ? (
        <NavVertical onShowVerticalNav={handleShowVerticalNav} />
      ) : null}
      {/* Compensate for fixed NavTop */}
      <div className="pt-16 min-h-screen ">
        <div
          className={`container mx-auto px-4 md:px-0 pb-6 ${className}`}
          ref={ref}
          id={pageId}
        >
          {children}
          <IconScrollTo targetId={pageId} parentRef={ref} />
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
