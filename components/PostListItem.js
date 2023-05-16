import { keyword2color, keyword2text } from "../keywords/posts";
import { useMouseHover } from "../hooks/useMouseHover";
import { date2text } from "../functions/date2text";
import Link from "next/link";

const PostListItem = ({
  readingTime,
  keywords,
  summary,
  title,
  date,
  slug,
}) => {
  const [divRef, divHovered] = useMouseHover();

  return (
    <div
      className="flex flex-col pb-2 border-b border-secondary dark:border-secondary-dark cursor-pointer"
      ref={divRef}>
      <Link className="space-y-2 pb-2" href={`/posts/${slug}`}>
        <h2
          className={`text-xl font-bold ${
            divHovered ? "underline decoration-2" : null
          }`}>
          {title}
        </h2>
        <div>
          <p>{summary}</p>
        </div>
        <div className="flex flex-wrap text-xs md:text-sm text-secondary dark:text-secondary-dark space-x-2 items-center">
          <p>{date2text(date)}</p>
          {[...keywords].map((keyword) => (
            <div className="flex space-x-1 items-center" key={keyword}>
              <p
                className="text-lg"
                style={{ color: `${keyword2color[keyword]}` }}>
                •
              </p>
              <p>{keyword2text[keyword]}</p>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default PostListItem;
