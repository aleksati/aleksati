const PostFilterItem = ({ children, onClick, isActive, color }) => {
  const clr = color ? color : "";
  return (
    <a
      className={`cursor-pointer p-1 px-2 text-sm border rounded border-primary-light dark:border-primary-dark ${
        isActive ? "bg-" + clr : null
      }`}
      onClick={(e) => onClick(e.target.innerHTML)}>
      {children}
    </a>
  );
};

export default PostFilterItem;
