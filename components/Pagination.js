import PaginationToggles from "./PaginationToggles";
import { useState, useEffect } from "react";

// takes an array (data) and limits the amount of items
// in the array that is returned based on the threshold prop
// (int amount of items per page), and toggled states (PaginationToggles)

const Pagination = ({ children, data, threshold }) => {
  // const [localFrontMatter, setLocalFrontMatter] = useState([]);
  const [numbPages, setNumbPages] = useState(0); // 0-based
  const [currPage, setCurrPage] = useState(0); // 0-based

  // onmount
  useEffect(() => {
    let pages = Math.floor(data.length / threshold);
    setNumbPages(pages < 0 ? 0 : pages);
    // setLocalFrontMatter(data);
  }, [data, threshold]);

  const handlePagination = (e) => {
    if (e.target.id === "numb") {
      let numb = Number(e.target.innerHTML);
      setCurrPage(numb - 1); // because 0-base
      return;
    }

    if (e.target.parentNode.id === "next") {
      setCurrPage((prevState) =>
        prevState + 1 > numbPages ? 0 : prevState + 1
      );
      return;
    }

    if (e.target.parentNode.id === "prev") {
      setCurrPage((prevState) =>
        prevState - 1 < 0 ? numbPages : prevState - 1
      );
      return;
    }
  };

  // if there is only one page, no need to show pagination toggles
  if (numbPages === 0) return <>{children(data)}</>;

  // used to be localFrontMatter in the below children prop
  return (
    <>
      {children(data.slice(currPage * threshold, (currPage + 1) * threshold))}
      <PaginationToggles
        onPagination={handlePagination}
        currPage={currPage}
        numbPages={numbPages}
      />
    </>
  );
};

export default Pagination;
