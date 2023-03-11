import { category2color } from "../categories/category2color";
import { category2text } from "../categories/category2text";
import { useMouseHover } from "../hooks/useMouseHover";
import { date2text } from "../functions/date2text";
import Link from "next/link";

const PostListItem = ({
  readingTime,
  categories,
  summary,
  title,
  date,
  slug,
}) => {
  const [divRef, divHovered] = useMouseHover();

  return (
    <div
      className="flex flex-col pb-2 border-b border-secondary cursor-pointer"
      ref={divRef}>
      <Link href={`/posts/${slug}`}>
        <div className="space-y-2 pb-2">
          <h2
            className={`text-2xl font-bold ${
              divHovered ? "underline decoration-2" : null
            }`}>
            {title}
          </h2>
          <div className="flex text-secondary space-x-2 text-sm">
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
          <div className="flex text-sm text-secondary space-x-2 items-center">
            {/* <Icon id="key" iconSize={"text-md"} /> */}
            {[...categories].map((category) => (
              <div className="flex space-x-1 items-center" key={category}>
                <p
                  className="text-lg "
                  style={{ color: `${category2color[category]}` }}>
                  •
                </p>
                <p>{category2text[category]}</p>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostListItem;
