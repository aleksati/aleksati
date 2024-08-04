import React, { forwardRef, useEffect, useState } from "react";
import NavVertical from "../components/NavVertical";
import NavTop from "../components/NavTop";
import { NextRouter, useRouter } from "next/router";

type Props = { pageId: string; children: React.ReactNode; className: string };
type Ref = HTMLDivElement;

const LayoutPageMobile = forwardRef<Ref, Props>(({ pageId, children, className }, ref) => {
  const [showNavVertical, setShowNavVertical] = useState<boolean>(false);

  // when navigating between dynamic routes (through the search input), I need to force a re-render of this component to close the verical navbar. onmount does not fire, so I have to use useRouter()
  const router: NextRouter = useRouter();
  const path: string = router.asPath;
  useEffect(() => {
    setShowNavVertical(false);
  }, [path]);

  const handleToggleNavVertical = () => setShowNavVertical((prevState) => !prevState);

  return (
    <>
      <NavTop onToggleNavVertical={handleToggleNavVertical} showNavVertical={showNavVertical} />
      {showNavVertical ? <NavVertical showNavTop={true} onToggleNavVertical={handleToggleNavVertical} /> : null}
      <div className={`container pb-6 ${showNavVertical && "blur-sm"} mx-auto flex-1 overflow-hidden px-4 pt-20 ${className}`} id={pageId} ref={ref}>
        {children}
      </div>
    </>
  );
});

export default LayoutPageMobile;
