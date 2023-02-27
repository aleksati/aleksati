import { category2color } from "../categories/category2color";
import { category2text } from "../categories/category2text";
import { useMouseHover } from "../hooks/useMouseHover";
import { date2text } from "../functions/date2text";
import Link from "next/link";
import Icon from "./Icon";

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
          <div>
            <p>{summary}</p>
          </div>
          <div className="flex text-secondary space-x-2 text-sm">
            <div className="flex space-x-1">
              <p>{date2text(date)}</p>
            </div>
            {/* <p>•</p>
            <div className="text-secondary text-sm">
              <p>{readingTime.text}</p>
            </div> */}
            <div className="flex space-x-2 items-center">
              {/* <Icon id="key" iconSize={"text-md"} /> */}
              {[...categories].map((category) => (
                <div className="flex space-x-1" key={category}>
                  <p style={{ color: `${category2color[category]}` }}>•</p>
                  <p>{category2text[category]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostListItem;

// <div
// className="flex flex-row rounded border-primary-light dark:border-primary-dark pb-4 space-x-4 cursor-pointer"
// ref={divRef}>
//  <Image src="/img/profile.jpg" width={200} height={100} />
// <div className="flex flex-col justify-between space-y-4">
//   <div className="space-y-2">
//     <h1
//       className={`text-2xl font-bold ${
//         divHovered ? "underline decoration-2" : null
//       }`}>
//       {title}
//     </h1>
//     <div className="flex space-x-1 text-sm items-center">
//       <p>{date}</p>
//       <p>•</p>
//       <p>{category}</p>
//     </div>
//     <div className="flex space-x-1 text-sm items-center">
//       <p>{readingTime.text}</p>
//     </div>
//     <div>
//       <p className="pr-6">{summary}</p>
//     </div>
//   </div>
//   <div>
//     <a className="font-bold">Read more ...</a>
//   </div>
// </div>
// </div>
