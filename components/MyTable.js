import MyTableCell from "./MyTableCell";
import { useState, useEffect } from "react";

// dynamic and responsive table
// takes a 2d list of items, like this:
// [["col1","col1","col1"]["col2","col2","col3"]]

const rowMap = {
  1: "md:grid-rows-1",
  2: "md:grid-rows-2",
  3: "md:grid-rows-3",
  4: "md:grid-rows-4",
  5: "md:grid-rows-5",
  6: "md:grid-rows-6",
  7: "md:grid-rows-7",
  8: "md:grid-rows-8",
  9: "md:grid-rows-9",
  10: "md:grid-rows-10",
  11: "md:grid-rows-11",
  12: "md:grid-rows-12",
  13: "md:grid-rows-13",
  14: "md:grid-rows-14",
  15: "md:grid-rows-15",
  16: "md:grid-rows-16",
  17: "md:grid-rows-17",
  18: "md:grid-rows-18",
  19: "md:grid-rows-19",
  20: "md:grid-rows-20",
  21: "md:grid-rows-21",
};

const MyTable = ({ cols, headings = "horizontal" }) => {
  const [numbRows, setNumbRows] = useState(null);
  const [items1d, setItems1d] = useState(null);

  // if a column is missing items, w respect to the largest column, add ""  as fillers
  const handleUnfinishedColumns = (cols, largestCol) => {
    const newCols = cols.map((col) => {
      while (col.length !== largestCol) {
        col.push("");
      }
      return col;
    });
    return newCols;
  };

  useEffect(() => {
    // find the largest row and number of columns (lists)
    const largestCol = Math.max(...cols.map((col) => col.length));
    setNumbRows(largestCol);

    const newCols = handleUnfinishedColumns(cols, largestCol);
    setItems1d([].concat(...newCols));
  }, [cols]);

  return (
    <div
      className={`grid grid-flow-row md:grid-flow-col mb-6 ${rowMap[numbRows]}`}>
      {items1d
        ? items1d.map((item, idx) => (
            <MyTableCell
              key={idx}
              invisible={!item}
              heading={
                headings == "horizontal"
                  ? idx % numbRows === 0
                  : headings == "vertical"
                  ? idx < numbRows
                  : false
              }>
              {item}
            </MyTableCell>
          ))
        : null}
    </div>
  );
};

export default MyTable;
