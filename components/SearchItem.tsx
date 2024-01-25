import DateAndKeywordViewer from "./DateAndKeywordViewer";
import { useEffect, useRef } from "react";
import Link from "next/link";

interface Props extends SearchResult {
  isActive: boolean;
}

const SearchItem = (props: Props) => {
  const { isActive, type, slug, title, date } = props;
  const ref = useRef<HTMLAnchorElement>();

  // focus the item on Arrow keypress
  useEffect(() => {
    if (isActive) ref.current.focus();
  }, [ref, isActive]);

  return (
    <Link href={`/${type}s/${slug}`} ref={ref}>
      <div
        className={`border-b ${
          isActive ? "bg-blue-200 dark:bg-blue-800" : "null"
        } hover:bg-blue-200 text-sm hover:dark:bg-blue-800 border-gray-200 dark:border-gray-800 p-2 hover:cursor-pointer`}>
        {title}
        <DateAndKeywordViewer
          showKeywords={false}
          showType={true}
          date={date}
          type={type}
          text={"xs"}
        />
      </div>
    </Link>
  );
};

export default SearchItem;
