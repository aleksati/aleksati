// import { useMouseHover } from "../hooks/useMouseHover";
import Link, { LinkProps } from "next/link";

interface MyLinkProps extends LinkProps {
  type?: string;
  className?: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
  href: string;
  id?: string;
}

const MyLink = ({
  type = "",
  className,
  children,
  active = false,
  onClick,
  href,
  id,
}: MyLinkProps): React.JSX.Element => {
  // url or tab
  const isActive: string | null = active ? "border-b-2" : null;
  // const isActive = active ? "font-bold" : null;
  // const isActive = "";

  // hover:border-b-2
  // hover:font-bold

  // const [divRef, divHovered] = useMouseHover();
  // &nbsp;

  if (type === "nav") {
    return (
      <div className="flex space-x-1">
        {active && <p className="font-bold">/</p>}
        {/* (active || divHovered) */}
        <Link
          className={`hover:cursor-pointer border-primary-light dark:border-primary-dark ${className}`}
          href={href}>
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
        role="link"
        id={id}>
        {children}
      </a>
    );
  }

  return (
    <a
      role="link"
      href={href}
      className={`text-base hover:cursor-pointer underline ${className}`}>
      {children}
    </a>
  );
};

export default MyLink;
