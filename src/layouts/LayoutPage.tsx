// import LayoutPageDesktop from "./LayoutPageDesktop-OLD";
// import useWindowSize from "../hooks/useWindowSize";
// import { useIsMounted } from "../hooks/useIsMounted";
// import LayoutPageMobile from "./LayoutPageMobile-OLD";
import React, { useEffect, useState, useRef } from "react";
import ButtonScrollTo from "../components/ButtonScrollTo";
import NavVerticalToc from "../components/NavVerticalToc";
import NavVertical from "../components/NavVertical";
import { NextRouter, useRouter } from "next/router";
import NavTop from "../components/NavTop";
import Meta from "../components/Meta";

type Props = {
  pageId?: string;
  children: React.ReactNode;
  className?: string;
  pageMeta?: MetaProps;
  toc?: TocList;
};

// this is a combo og what LayoutPage and LayoutPageMobile was
const LayoutPage = ({
  pageId = "top",
  children,
  className,
  pageMeta,
  toc = null,
}: Props) => {
  // this is for the ScrollToTop arrow icon
  const pageTopRef = useRef<HTMLDivElement>(null);

  const [showNavVertical, setShowNavVertical] = useState<boolean>(false);
  const [showNavVerticalToc, setShowNavVerticalToc] = useState<boolean>(false);

  // when navigating between dynamic routes (through the search input), I need to force a re-render of this component to close the verical navbar. onmount does not fire, so I have to use useRouter()
  const router: NextRouter = useRouter();
  const path: string = router.asPath;
  useEffect(() => {
    setShowNavVertical(false);
    setShowNavVerticalToc(false);
  }, [path]);

  const handleToggleNavVertical = () => {
    // if NavVertical is going to be true, turn off Toc first
    if (!showNavVertical) setShowNavVerticalToc(false);
    setShowNavVertical((prevState) => !prevState);
  };
  const handleToggleNavVerticalToc = () => {
    // if NavVerticalToc is going to be true, turn off Nav first
    if (!showNavVerticalToc) setShowNavVertical(false);
    setShowNavVerticalToc((prevState) => !prevState);
  };

  return (
    <>
      <Meta {...pageMeta} />
      <div className="min-h-screen flex relative">
        <NavTop
          onToggleNavVertical={handleToggleNavVertical}
          showNavVertical={showNavVertical}
          onToggleNavVerticalToc={handleToggleNavVerticalToc}
          showNavVerticalToc={showNavVerticalToc}
          isPostWithToc={toc ? true : false}
        />
        {showNavVertical ? (
          <NavVertical onToggleNavVertical={handleToggleNavVertical} />
        ) : null}
        {/* {showNavVerticalToc ? (
          <NavVerticalToc
            onToggleNavVerticalToc={handleToggleNavVerticalToc}
            toc={toc}
          />
        ) : null} */}
        <div
          className={`container pb-6 mx-auto flex-1 overflow-hidden px-4 pt-20 ${className}`}
          id={pageId}
          ref={pageTopRef}>
          {children}
        </div>      
                 {showNavVerticalToc ? (
          <NavVerticalToc
            onToggleNavVerticalToc={handleToggleNavVerticalToc}
            toc={toc}
          />
        ) : null}
        {/* <div
          className={`container pb-6 ${
            showNavVertical && "blur-sm"
          } mx-auto flex-1 overflow-hidden px-4 pt-20 ${className}`}
          id={pageId}
          ref={ref}>
          {children}
        </div> */}
        <div className="absolute right-10">
          <div className="fixed bottom-4">
            <ButtonScrollTo targetId={pageId} PageTopRef={pageTopRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutPage;
