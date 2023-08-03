import { useMouseHover } from "../hooks/useMouseHover";
import Link from "next/link";

const MyLink = ({ type, className, children, active, href, onClick, id }) => {
  // url or tab
  const isActive = active ? "border-b-2" : null;
  // const isActive = active ? "font-bold" : null;
  // const isActive = "";

  // hover:border-b-2
  // hover:font-bold

  // const [divRef, divHovered] = useMouseHover();
  // &nbsp;

  if (type === "nav") {
    return (
      <div className="flex space-x-1">
        {/* <div ref={divRef} className="flex space-x-1"> */}
        {active && <p className="font-bold">/</p>}
        {/* (active || divHovered) */}
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
        className={`hover:cursor-pointer border-primary-light dark:border-primary-dark ${isActive} ${className}`}
        onClick={onClick}
        id={id}>
        {children}
      </a>
    );
  }

  // return (
  //   <a
  //     href={href}
  //     className={`text-blue-400 hover:cursor-pointer dark:text-blue-300 hover:text-blue-600 hover:dark:text-blue-400 ${className}`}
  //   >
  //     {children}
  //   </a>
  // );

  return (
    <a href={href} className={`hover:cursor-pointer underline ${className}`}>
      {children}
    </a>
  );
};

export default MyLink;
