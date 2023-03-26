const MyTableCell = ({ children, heading, invisible }) => {
  return (
    <div
      className={`bg-red-300 p-4 ${
        heading ? "font-bold" : "font-normal"
      } rounded-sm border-bg-primary ${invisible ? "invisible" : "visible"}`}>
      {children}
    </div>
  );
};

export default MyTableCell;
