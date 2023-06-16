import MyLink from "./MyLink";
import Icon from "./Icon";

const PaginationToggles = ({ currPage, numbPages, onPagination }) => {
  const numbPagesArray = Array(numbPages + 1).fill(0);

  return (
    <div className="flex space-x-6 w-full items-center justify-center">
      <MyLink type="pagination" onClick={onPagination} id="prev">
        <Icon id={"prevArrow"} iconSize={"text-md"} />
      </MyLink>
      {numbPagesArray.map((item, index) => (
        <div key={index} className="text-base">
          <MyLink
            active={index === currPage}
            onClick={onPagination}
            type="pagination"
            id="numb"
          >
            {index + 1}
          </MyLink>
        </div>
      ))}
      <MyLink type="pagination" onClick={onPagination} id="next">
        <Icon id={"nextArrow"} iconSize={"text-md"} />
      </MyLink>
    </div>
  );
};

export default PaginationToggles;
