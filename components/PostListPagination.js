import MyLink from "./MyLink";
import Icon from "./Icon";

const PostListPagination = ({ currPage, numbPages }) => {
  const numbPagesArray = Array(numbPages).fill(0);

  return (
    <div className="flex space-x-6 w-full items-center justify-center">
      <MyLink
        type="nav"
        href={`posts/${currPage - 1 <= 0 ? numbPages : currPage - 1}`}>
        <Icon id={"prevArrow"} iconSize={"text-sm"} />
      </MyLink>
      {numbPagesArray.map((item, index) => (
        <div key={index}>
          <MyLink
            type="nav"
            href={`posts/${index + 1}`}
            active={index + 1 === currPage}>
            {index + 1}
          </MyLink>
        </div>
      ))}
      <MyLink
        type="nav"
        href={`posts/${currPage + 1 > numbPages ? 1 : currPage + 1}`}>
        <Icon id={"nextArrow"} iconSize={"text-sm"} />
      </MyLink>
    </div>
  );
};

export default PostListPagination;
