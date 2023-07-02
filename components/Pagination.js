import PaginationToggles from "./PaginationToggles";
import { useState, useEffect } from "react";

// takes an array (data) and limits the amount of items
// in the array that is returned based on the threshold prop
// (int amount of items per page), and toggled states (PaginationToggles)

const Pagination = ({ children, data, threshold }) => {
  // const [localFrontMatter, setLocalFrontMatter] = useState([]);
  const [numbPages, setNumbPages] = useState(1); // 1-based
  const [currPage, setCurrPage] = useState(1); // 1-based

  const startIdx = (currPage - 1) * threshold;
  const endIdx = currPage * threshold;

  // onmount
  useEffect(() => {
    const pages = Math.round(data.length / threshold + 0.4);
    setNumbPages(pages);
    // setLocalFrontMatter(data);
  }, [data, threshold]);

  const handlePagination = (e) => {
    if (e.target.id === "numb") {
      setCurrPage(Number(e.target.innerHTML)); // because 0-base
      return;
    }

    if (e.target.parentNode.id === "next") {
      setCurrPage((prevState) =>
        prevState + 1 > numbPages ? 1 : prevState + 1
      );
      return;
    }

    if (e.target.parentNode.id === "prev") {
      setCurrPage((prevState) =>
        prevState - 1 < 1 ? numbPages : prevState - 1
      );
      return;
    }
  };

  // if there is only one page, no need to show pagination toggles
  if (numbPages === 1) return <>{children(data)}</>;

  // used to be localFrontMatter in the below children prop
  return (
    <>
      {children(data.slice(startIdx, endIdx))}
      <PaginationToggles
        onPagination={handlePagination}
        currPage={currPage}
        numbPages={numbPages}
      />
    </>
  );
};

export default Pagination;
