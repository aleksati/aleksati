import { useMouseHover } from "../hooks/useMouseHover";
import DateAndKeywordViewer from "./DateAndKeywordViewer";
import Link from "next/link";

type PostListItem = FrontMatter & {
  showType: boolean;
};

const PostListItem = ({
  slug,
  date,
  title,
  summary,
  keywords,
  type,
  showType,
}: PostListItem) => {
  const [ref, isHovered] = useMouseHover<HTMLDivElement>();

  const typ = type === "music" ? type : type + "s";

  return (
    <div
      className="flex flex-col pb-4 border-b border-secondary-light dark:border-secondary-dark cursor-pointer"
      ref={ref}>
      <Link className="space-y-2" href={`/${typ}/${slug}`}>
        <h2
          className={`text-xl font-bold ${
            isHovered ? "underline decoration-2" : null
          }`}>
          {title}
        </h2>
        <div>
          <p>{summary}</p>
        </div>
        <DateAndKeywordViewer
          keywords={keywords}
          date={date}
          type={type}
          showType={showType}
        />
      </Link>
    </div>
  );
};

export default PostListItem;
