import DateAndKeywordViewer from "./DateAndKeywordViewer";
import { useEffect, useRef } from "react";
import Link from "next/link";

const SearchItem = ({
  fronMatter,
  isActive,
}: {
  fronMatter: FrontMatter;
  isActive: boolean;
}) => {
  const { type, slug, title, date, summary, keywords } = fronMatter;
  const ref = useRef<HTMLAnchorElement>(null);

  // focus the item on Arrow keypress
  useEffect(() => {
    if (isActive) ref.current.focus();
  }, [ref, isActive]);

  // handle different types
  let typ: string;
  switch (type) {
    case "music":
      typ = type;
      break;
    case "extra":
      typ = "";
      break;
    default:
      typ = type + "s";
      break;
  }

  return (
    <Link href={`/${typ}/${slug}`} ref={ref}>
      <div
        className={`border-b ${
          isActive ? "bg-blue-200 dark:bg-blue-800" : "none"
        } hover:bg-blue-200 hover:dark:bg-blue-800 border-gray-200 dark:border-gray-600 p-2 space-y-1 hover:cursor-pointer`}
      >
        <p>{title}</p>
        {/* This just looks better, to ignore keyword for the "extra" search items (about, publications)*/}
        {type === "extra" ? null : (
          <DateAndKeywordViewer
            showKeywords={true}
            keywords={keywords}
            showType={true}
            date={date}
            type={type}
            text={"xs"}
          />
        )}
        <p className="text-sm text-secondary">{summary.slice(0, 100)} ...</p>
      </div>
    </Link>
  );
};

export default SearchItem;
