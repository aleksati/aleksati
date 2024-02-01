import PaginationToggles from "./PaginationToggles";
import { useState, useEffect } from "react";

// takes an array (data) and limits the amount of items
// in the array that is returned based on the threshold prop
// (int amount of items per page), and toggled states (PaginationToggles)

type Props = {
  children(data: FrontMatterList): React.ReactNode;
  frontMatterList: FrontMatterList;
  threshold: number;
};

const Pagination = ({ children, frontMatterList, threshold }: Props) => {
  // const [localFrontMatter, setLocalFrontMatter] = useState([]);
  const [numbPages, setNumbPages] = useState<number>(1); // 1-based
  const [currPage, setCurrPage] = useState<number>(1); // 1-based

  const startIdx: number = (currPage - 1) * threshold;
  const endIdx: number = currPage * threshold;

  // onmount
  useEffect(() => {
    const pages: number = Math.round(frontMatterList.length / threshold + 0.4);
    setNumbPages(pages);
    // setLocalFrontMatter(data);
  }, [frontMatterList, threshold]);

  const handlePagination = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLElement;
    const targetId = target.id as string;
    const parentNode = target.parentNode as HTMLElement;

    if (targetId === "numb") {
      setCurrPage(Number(target.innerHTML)); // because 0-base
      return;
    }

    if (parentNode.id === "next") {
      setCurrPage((prevState) =>
        prevState + 1 > numbPages ? 1 : prevState + 1
      );
      return;
    }

    if (parentNode.id === "prev") {
      setCurrPage((prevState) =>
        prevState - 1 < 1 ? numbPages : prevState - 1
      );
      return;
    }
  };

  // if there is only one page, no need to show pagination toggles
  if (numbPages === 1) return <>{children(frontMatterList)}</>;

  // used to be localFrontMatter in the below children prop
  return (
    <>
      {children(frontMatterList.slice(startIdx, endIdx))}
      <PaginationToggles
        onPagination={handlePagination}
        currPage={currPage}
        numbPages={numbPages}
      />
    </>
  );
};

export default Pagination;
