const MyTableCell = ({ children, heading, invisible }) => {
  return (
    <div
      className={`bg-primary-light dark:bg-primary-dark p-1 ${
        heading ? "font-bold" : "font-normal"
      } border ${invisible ? "invisible" : "visible"}`}>
      {children}
    </div>
  );
};

export default MyTableCell;

// bg-[#fee2e2] dark:bg-[#0c4a6e]
