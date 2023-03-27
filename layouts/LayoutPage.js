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
    <div className="text-base">
      <Meta {...pageMeta} />
      <NavTop onClick={handleClick} showSearch={showSearch} />
      {navIsShown ? <NavVertical onClick={handleClick} /> : null}
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
