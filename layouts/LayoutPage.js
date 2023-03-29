import isTouchDevice from "../functions/isTouchDevice";
import IconScrollTo from "../components/IconScrollTo";
import NavVertical from "../components/NavVertical";
import { useEffect, useRef, useState } from "react";
// import useWindowSize from "../hooks/useWindowSize";
import NavTop from "../components/NavTop";
import Meta from "../components/Meta";

const LayoutPage = ({
  pageId = "top",
  children,
  className,
  pageMeta,
  showSearch = true,
}) => {
  const ref = useRef(null);
  const [navIsShown, setNavIsShown] = useState(true);
  // const { width } = useWindowSize();
  const isMobile = isTouchDevice();

  useEffect(() => {
    setNavIsShown(isMobile ? false : true);
  }, [isMobile]);

  const handleClick = () => setNavIsShown((prevState) => !prevState);

  return (
    <div className="text-base items-center">
      <Meta {...pageMeta} />
      <NavTop onClick={handleClick} showSearch={showSearch} />
      {navIsShown ? <NavVertical onClick={handleClick} /> : null}
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
