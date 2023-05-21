import { useIsMounted } from "../hooks/useIsMounted";
import LayoutPageDesktop from "./LayoutPageDesktop";
import useWindowSize from "../hooks/useWindowSize";
import LayoutPageMobile from "./LayoutPageMobile";
import Meta from "../components/Meta";
import { useRef } from "react";

const widthTresh = 768; // tailwind md = 768;

const LayoutPage = ({ pageId = "top", children, className, pageMeta }) => {
  const [isMounted, setIsMounted] = useIsMounted();
  const { width } = useWindowSize();
  const pageTopRef = useRef();

  if (!isMounted) return null;

  return (
    <>
      <Meta {...pageMeta} />
      <div className="min-h-screen max-w-6xl flex">
        {width < widthTresh ? (
          <LayoutPageMobile
            pageId={pageId}
            className={className}
            ref={pageTopRef}>
            {children}
          </LayoutPageMobile>
        ) : (
          <LayoutPageDesktop
            pageId={pageId}
            className={className}
            ref={pageTopRef}>
            {children}
          </LayoutPageDesktop>
        )}
      </div>
    </>
  );
};

export default LayoutPage;
