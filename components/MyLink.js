import Link from "next/link";

const MyLink = ({ type, className, children, active, href }) => {
  // url or tab
  const isActive = active ? "border-b-2" : null;

  if (type === "nav") {
    return (
      <div>
        <Link
          className={`hover:cursor-pointer border-primary-light dark:border-primary-dark hover:border-b-2 ${isActive} ${className}`}
          href={`/${href}`}>
          {children}
        </Link>
      </div>
    );
  }

  return (
    <a
      href={href}
      className={`text-blue-600 dark:text-blue-300 hover:underline ${className}`}>
      {children}
    </a>
  );
};

export default MyLink;
