import isTouchDevice from "../functions/isTouchDevice";
import ButtonScrollTo from "../components/ButtonScrollTo";
import NavVertical from "../components/NavVertical";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import NavTop from "../components/NavTop";
import Meta from "../components/Meta";
import ButtonIcon from "../components/ButtonIcon";

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
      {!navIsShown ? (
        <NavTop
          onShowVerticalNav={handleShowVerticalNav}
          isMobileSearch={width < widthTresh}
        />
      ) : null}
      <div className="min-h-screen flex">
        {navIsShown ? (
          <NavVertical onShowVerticalNav={handleShowVerticalNav} />
        ) : null}
        <div
          className={`container blur-sm mx-auto flex-1 px-4 py-4 ${className}`}
          ref={ref}
          id={pageId}>
          {children}
        </div>
        <div className="fixed scrollLock-compensation right-4 top-4">
          <ButtonIcon
            iconId="x"
            iconSize="text-2xl"
            onClick={handleShowVerticalNav}
          />
        </div>
        <div className="fixed scrollLock-compensation right-4 bottom-4">
          <ButtonScrollTo targetId={pageId} parentRef={ref} />
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
