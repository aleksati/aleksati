import PaginationToggles from "./PaginationToggles";
import { useState, useEffect } from "react";

// takes an array (data) and limits the amount of items
// in the array that is returned based on the threshold
// (int amount of items per page), and toggled states (PaginationToggles)

const Pagination = ({ children, data, threshold }) => {
  const [localFrontMatter, setLocalFrontMatter] = useState([]);
  const [numbPages, setNumbPages] = useState(0); // 0-based
  const [currPage, setCurrPage] = useState(0); // 0-based

  // onmount
  useEffect(() => {
    let pages = Math.floor(data.length / threshold) - 1;
    setNumbPages(pages < 0 ? 0 : pages);
    setLocalFrontMatter(data);
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

  return (
    <>
      {children(
        localFrontMatter.slice(currPage * threshold, (currPage + 1) * threshold)
      )}
      <PaginationToggles
        onPagination={handlePagination}
        currPage={currPage}
        numbPages={numbPages}
      />
    </>
  );
};

export default Pagination;
