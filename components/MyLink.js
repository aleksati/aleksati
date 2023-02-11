import Link from "next/link";

const MyLink = ({ type = "", className, children, onClick, active, href }) => {
  // url or tab
  const isActive = active ? "border-b-2" : null;

  if (type === "page") {
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
      className={`hover:underline decoration-solid hover:cursor-pointer ${className} text-blue-400`}>
      {children}
    </a>
  );
};

export default MyLink;
