import ButtonScrollTo from "../components/ButtonScrollTo";
// import { useIsMounted } from "../hooks/useIsMounted";
import LayoutPageDesktop from "./LayoutPageDesktop-OLD";
// import useWindowSize from "../hooks/useWindowSize";
import LayoutPageMobile from "./LayoutPageMobile-OLD";
import Meta from "../components/Meta";
import React, { useRef } from "react";

// const widthTresh: number = 1322; // tailwind md; var 768 // lg 1024

type Props = {
  pageId?: string;
  children: React.ReactNode;
  className?: string;
  pageMeta?: MetaProps;
  toc?: TocList;
};

const LayoutPage = ({ pageId = "top", children, className, pageMeta,  toc=null}: Props) => {
  // const { width } = useWindowSize();
  const pageTopRef = useRef<HTMLDivElement>(null);
  // const [isMounted, setIsMounted] = useIsMounted();
  // if (!isMounted) return null;

  return (
    <>
      <Meta {...pageMeta} />
      <div className="min-h-screen flex relative">
        {/* var max-w-7xl */}
        {/* width < widthTresh */}
        {true ? (
          <LayoutPageMobile pageId={pageId} className={className} toc={toc} isPostWithToc={toc ? true : false} ref={pageTopRef}>
            {children}
          </LayoutPageMobile>
        ) : (
          <LayoutPageDesktop pageId={pageId} className={className}  toc={toc} isPostWithToc={toc ? true : false} ref={pageTopRef}>
            {children}
          </LayoutPageDesktop>
        )}
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
