import ButtonScrollTo from "../components/ButtonScrollTo";
// import { useIsMounted } from "../hooks/useIsMounted";
import LayoutPageDesktop from "./LayoutPageDesktop";
import useWindowSize from "../hooks/useWindowSize";
import LayoutPageMobile from "./LayoutPageMobile";
import Meta from "../components/Meta";
import React, { useRef } from "react";

const widthTresh: number = 768; // tailwind md; 768 // lg

type Props = {
  pageId?: string;
  children: React.ReactNode;
  className?: string;
  pageMeta?: MetaProps;
  toc?: TocList;
  isPostWithToc?: boolean;
};

const LayoutPage = ({ pageId = "top", children, className, pageMeta,  toc=null, isPostWithToc=false}: Props) => {
  const { width } = useWindowSize();
  const pageTopRef = useRef<HTMLDivElement>(null);
  // const [isMounted, setIsMounted] = useIsMounted();
  // if (!isMounted) return null;

  return (
    <>
      <Meta {...pageMeta} />
      <div className="min-h-screen max-w-7xl flex relative">
        {width < widthTresh ? (
          <LayoutPageMobile pageId={pageId} className={className}  toc={toc} isPostWithToc={isPostWithToc} ref={pageTopRef}>
            {children}
          </LayoutPageMobile>
        ) : (
          <LayoutPageDesktop pageId={pageId} className={className}  toc={toc} isPostWithToc={isPostWithToc} ref={pageTopRef}>
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
