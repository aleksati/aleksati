import { useMouseHover } from "../hooks/useMouseHover";
// import Image from "next/image";

const PostListItem = ({
  title,
  date,
  category,
  summary,
  readingTime,
  wordCount,
}) => {
  const [divRef, divHovered] = useMouseHover();

  return (
    <div
      className="flex flex-row rounded border-primary-light dark:border-primary-dark pb-4 space-x-4 cursor-pointer"
      ref={divRef}>
      {/* <Image src="/img/profile.jpg" width={200} height={100} /> */}
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h1
            className={`text-2xl font-bold ${
              divHovered ? "underline decoration-2" : null
            }`}
            onClick={() => {}}>
            {title}
          </h1>
          <div className="flex space-x-1 text-sm items-center">
            <p>{date}</p>
            <p>•</p>
            <p>{category}</p>
          </div>
          <div className="flex space-x-1 text-sm items-center">
            <p>{readingTime.text}</p>
          </div>
          <div>
            <p className="pr-6">{summary}</p>
          </div>
        </div>
        <div>
          <a className="font-bold">Read more ..</a>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
