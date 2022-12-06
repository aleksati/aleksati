const MyLink = ({
  type = "tab",
  children,
  onClick,
  href,
  className,
  active,
}) => {
  // url or tab
  const isActive = active ? "border-b-2" : null;

  if (type === "tab") {
    return (
      <div className="m-2">
        <a
          onClick={onClick}
          className={`hover:border-b-2 border-primary-light dark:border-primary-dark hover:cursor-pointer ${isActive} ${className}`}>
          {children}
        </a>
      </div>
    );
  }

  return (
    <a
      href={href}
      className={`hover:underline decoration-solid hover:cursor-pointer ${className} text-blue-400`}>
      {children}
    </a>
  );
};

export default MyLink;
