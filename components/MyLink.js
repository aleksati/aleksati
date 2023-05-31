import { useMouseHover } from "../hooks/useMouseHover";
import Link from "next/link";

const MyLink = ({ type, className, children, active, href, onClick, id }) => {
  // url or tab
  // const isActive = active ? "border-b-2" : null;
  // const isActive = active ? "font-bold" : null;
  // const isActive = "";

  // hover:border-b-2
  // hover:font-bold

  const [divRef, divHovered] = useMouseHover();

  if (type === "nav") {
    return (
      <div ref={divRef} className="flex">
        {(active || divHovered) && <p className="font-bold">/&nbsp;</p>}
        <Link
          className={`hover:cursor-pointer border-primary-light dark:border-primary-dark ${className}`}
          href={href + ""}>
          {children}
        </Link>
      </div>
    );
  }

  if (type === "pagination") {
    return (
      <a
        className={`hover:cursor-pointer border-primary-light dark:border-primary-dark hover:border-b-2 ${isActive} ${className}`}
        onClick={onClick}
        id={id}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`text-blue-400 hover:cursor-pointer dark:text-blue-300 hover:text-blue-600 hover:dark:text-blue-400 ${className}`}>
      {children}
    </a>
  );
};

export default MyLink;
