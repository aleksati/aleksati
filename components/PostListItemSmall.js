import { useMouseHover } from "../hooks/useMouseHover";
import DateAndKeywordViewer from "./DateAndKeywordViewer";
import Link from "next/link";

const PostListItemSmall = ({ keywords, summary, title, date, slug, type }) => {
  const [divRef, divHovered] = useMouseHover();

  return (
    <div className="flex flex-col pb-2 cursor-pointer" ref={divRef}>
      <Link className="space-y-1" href={`/${type}s/${slug}`}>
        <p
          className={`text-base ${
            divHovered ? "underline decoration-2" : null
          }`}>
          {title}
        </p>
        <DateAndKeywordViewer
          showKeywords={false}
          // keywords={keywords}
          date={date}
          showType={true}
          type={type}
        />
      </Link>
    </div>
  );
};

export default PostListItemSmall;
