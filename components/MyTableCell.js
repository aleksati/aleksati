const MyTableCell = ({ children, heading, invisible }) => {
  return (
    <div
      className={`bg-[#fee2e2] dark:bg-[#0c4a6e] p-2 ${
        heading ? "font-bold" : "font-normal"
      } rounded-sm border-bg-primary ${invisible ? "invisible" : "visible"}`}>
      {children}
    </div>
  );
};

export default MyTableCell;
