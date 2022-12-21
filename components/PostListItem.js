import { useMouseHover } from "../hooks/useMouseHover";
import { category2color } from "../functions/category2color";
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
      className="flex flex-col space-y-4 pb-4 border-b border-secondary cursor-pointer"
      ref={divRef}>
      <Link href={`/posts/${slug}`}>
        <div className="space-y-4 pb-2">
          <div className="space-y-2">
            <div>
              <h1
                className={`text-2xl font-bold ${
                  divHovered ? "underline decoration-2" : null
                }`}>
                {title}
              </h1>
            </div>
            <div className="flex text-secondary space-x-2 text-sm">
              <p>{date}</p>
              <p>•</p>
              <div className="flex space-x-2">
                {[...categories].map((category) => (
                  <div className="flex space-x-1" key={category}>
                    <p style={{ color: `${category2color[category]}` }}>■</p>
                    <p>{category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p>{summary}</p>
          </div>
        </div>
        {/* <div>
          <p className="font-bold">Read more ...</p>
        </div> */}
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
