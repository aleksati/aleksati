import React, { forwardRef, useEffect, useState } from "react";
import NavVertical from "../components/NavVertical";
import NavVerticalToc from "../components/NavVerticalToc";
import NavTop from "../components/NavTop";
import { NextRouter, useRouter } from "next/router";

type Props = {
  pageId: string;
  children: React.ReactNode;
  className: string;
  toc: TocList;
  isPostWithToc: boolean;
};
type Ref = HTMLDivElement;

// cases to implement.
// if menu is toggled to true and TOC is true, toc should be false
// if TOC is toggled to true and TOC is true, menu should be false.
// ensure there is TOC 

const LayoutPageMobile = forwardRef<Ref, Props>(
  ({ pageId, children, className, toc, isPostWithToc }, ref) => {
    const [showNavVertical, setShowNavVertical] = useState<boolean>(false);
    const [showNavVerticalToc, setShowNavVerticalToc] =
      useState<boolean>(false);

    // when navigating between dynamic routes (through the search input), I need to force a re-render of this component to close the verical navbar. onmount does not fire, so I have to use useRouter()
    const router: NextRouter = useRouter();
    const path: string = router.asPath;
    useEffect(() => {
      setShowNavVertical(false);
    }, [path]);

    const handleToggleNavVertical = () =>
      setShowNavVertical((prevState) => !prevState);

    const handleToggleNavVerticalToc = () =>
      setShowNavVerticalToc((prevState) => !prevState);

    return (
      <>
        <NavTop
          onToggleNavVertical={handleToggleNavVertical}
          showNavVertical={showNavVertical}
          onToggleNavVerticalToc={handleToggleNavVerticalToc}
          showNavVerticalToc={showNavVerticalToc}
          isPostWithToc={isPostWithToc}
        />
        {showNavVertical ? (
          <NavVertical onToggleNavVertical={handleToggleNavVertical} />
        ) : null}
        {showNavVerticalToc ? (
          <NavVerticalToc
            onToggleNavVerticalToc={handleToggleNavVertical}
            toc={toc}
          />
        ) : null}
        <div
          className={`container pb-6 mx-auto flex-1 overflow-hidden px-4 pt-20 ${className}`}
          id={pageId}
          ref={ref}>
          {children}
        </div>
        {/* <div
          className={`container pb-6 ${
            showNavVertical && "blur-sm"
          } mx-auto flex-1 overflow-hidden px-4 pt-20 ${className}`}
          id={pageId}
          ref={ref}>
          {children}
        </div> */}
      </>
    );
  }
);

export default LayoutPageMobile;
