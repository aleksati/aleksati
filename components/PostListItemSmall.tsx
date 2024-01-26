import { useMouseHover } from "../hooks/useMouseHover";
import DateAndKeywordViewer from "./DateAndKeywordViewer";
import Link from "next/link";

const PostListItemSmall = ({
  slug,
  date,
  title,
  summary,
  keywords,
  type,
}: FrontMatter) => {
  const [ref, isHovered] = useMouseHover<HTMLDivElement>();

  const typ = type === "music" ? type : type + "s";

  return (
    <div className="flex flex-col pb-2 cursor-pointer" ref={ref}>
      <Link className="space-y-1" href={`/${typ}/${slug}`}>
        <p
          className={`text-base ${
            isHovered ? "underline decoration-2" : null
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
