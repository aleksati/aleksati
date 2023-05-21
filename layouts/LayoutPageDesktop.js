import ButtonScrollTo from "../components/ButtonScrollTo";
import NavVertical from "../components/NavVertical";
import { forwardRef } from "react";

const LayoutPageDesktop = forwardRef(({ pageId, children, className }, ref) => (
  <>
    <NavVertical showNavTop={false} />
    <div
      className={`container pb-4 mx-auto flex-1 overflow-hidden px-4 pt-6 ${className}`}
      id={pageId}
      ref={ref}>
      {children}
    </div>
    <div className="fixed right-4 bottom-4">
      <ButtonScrollTo targetId={pageId} parentRef={ref} />
    </div>
  </>
));

export default LayoutPageDesktop;
