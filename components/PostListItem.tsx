import { useMouseHover } from "../hooks/useMouseHover";
import DateAndKeywordViewer from "./DateAndKeywordViewer";
import Link from "next/link";

const PostListItem = ({
  slug,
  date,
  title,
  summary,
  keywords,
  type,
}: FrontMatter) => {
  const [ref, isHovered] = useMouseHover<HTMLDivElement>();

  return (
    <div
      className="flex flex-col pb-2 border-b border-secondary-light dark:border-secondary-dark cursor-pointer"
      ref={ref}>
      <Link className="space-y-2 pb-2" href={`/${type}s/${slug}`}>
        <h2
          className={`text-xl font-bold ${
            isHovered ? "underline decoration-2" : null
          }`}>
          {title}
        </h2>
        <div>
          <p>{summary}</p>
        </div>
        <DateAndKeywordViewer keywords={keywords} date={date} type={type} />
      </Link>
    </div>
  );
};

export default PostListItem;
