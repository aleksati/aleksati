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
      <Link href={`/posts/${slug}`}>
        <div className="space-y-2 pb-2">
          <h2
            className={`text-2xl font-bold ${
              divHovered ? "underline decoration-2" : null
            }`}>
            {title}
          </h2>
          <div className="flex text-secondary dark:text-secondary-dark space-x-2 text-xs md:text-sm">
            <div className="flex space-x-1">
              <p>{date2text(date)}</p>
            </div>
            <p>•</p>
            <div>
              <p>{readingTime.text}</p>
            </div>
          </div>
          <div>
            <p>{summary}</p>
          </div>
          <div className="flex overflow-hidden text-xs md:text-sm text-secondary dark:text-secondary-dark space-x-2 items-center">
            {/* <Icon id="key" iconSize={"text-md"} /> */}
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
        </div>
      </Link>
    </div>
  );
};

export default PostListItem;
