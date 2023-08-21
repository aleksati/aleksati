import { useEffect, useRef } from "react";
import { date2text } from "../functions/date2text";
import Link from "next/link";

const SearchItem = ({ slug, type, title, date, active = false }) => {
  const ref = useRef();

  // focus the item on Arrow keypress
  useEffect(() => {
    if (active) ref.current.focus();
  }, [ref, active]);

  return (
    <Link href={`/${type}s/${slug}`} ref={ref}>
      <div
        className={`border-b ${
          active ? "bg-blue-200 dark:bg-blue-800" : "null"
        } hover:bg-blue-200 hover:dark:bg-blue-800 border-gray-200 dark:border-gray-800 p-2 hover:cursor-pointer`}>
        {title}
        <p className="text-secondary text-xs">
          {type} • {date2text(date, type)}
        </p>
      </div>
    </Link>
  );
};

export default SearchItem;
