import NavVertical from "../components/NavVertical";
import { forwardRef } from "react";

type Props = {
  pageId: string;
  children: React.ReactNode;
  className: string;
  toc: TocList;
  isPostWithToc: boolean;
};
type Ref = HTMLDivElement;

const LayoutPageDesktop = forwardRef<Ref, Props>(
  ({ pageId, children, className, toc, isPostWithToc }, ref) => (
    <>
      <NavVertical showNavTop={false} toc={toc} isPostWithToc={isPostWithToc} />
      <div
        className={`container pb-6 mx-auto flex-1 overflow-hidden px-4 sm:px-2 pt-4 ${className}`}
        id={pageId}
        ref={ref}>
        {children}
      </div>
    </>
  )
);

export default LayoutPageDesktop;
