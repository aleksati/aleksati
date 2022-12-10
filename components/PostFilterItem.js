const PostFilterItem = ({ children, onClick, isActive, color }) => {
  return (
    <a
      className={`cursor-pointer p-1 px-2 text-sm border rounded border-primary-light dark:border-primary-dark`}
      onClick={(e) => onClick(e.target.innerHTML)}>
      {children}
    </a>
  );
};

export default PostFilterItem;
