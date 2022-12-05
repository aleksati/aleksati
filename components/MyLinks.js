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
      <div
        onClick={onClick}
        className={`hover:border-b-2 space-x-2 border-primary-light dark:border-primary-dark hover:cursor-pointer ${isActive} ${className}`}
      >
        <p>{children}</p>
      </div>
    );
  }

  return (
    <a
      href={href}
      className={`hover:underline decoration-solid hover:cursor-pointer ${className} text-blue-400`}
    >
      {children}
    </a>
  );
};

export default MyLink;
