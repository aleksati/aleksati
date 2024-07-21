import NavVertical from "../components/NavVertical";
import { forwardRef } from "react";

type Props = { pageId: string; children: React.ReactNode; className: string };
type Ref = HTMLDivElement;

const LayoutPageDesktop = forwardRef<Ref, Props>(({ pageId, children, className }, ref) => (
  <>
    <NavVertical showNavTop={false} />
    <div className={`container pb-4 mx-auto flex-1 overflow-hidden px-4 pt-4 ${className}`} id={pageId} ref={ref}>
      {children}
    </div>
  </>
));

export default LayoutPageDesktop;
