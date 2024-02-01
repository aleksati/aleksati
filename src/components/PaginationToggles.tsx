import MyLink from "./MyLink";
import Icon from "./Icon";

type Props<T> = {
  currPage: T;
  numbPages: T;
  onPagination: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const PaginationToggles = ({
  currPage,
  numbPages,
  onPagination,
}: Props<number>) => {
  // array with length of numbPages
  const numbPagesArray: number[] = Array(numbPages).fill(0);

  return (
    <div className="flex space-x-6 w-full items-center justify-center">
      <MyLink href="" type="pagination" onClick={onPagination} id="prev">
        <Icon id={"prevArrow"} iconSize="text-md" />
      </MyLink>
      {numbPagesArray.map((item, index) => (
        <div key={index} className="text-md">
          <MyLink
            active={index + 1 === currPage}
            onClick={onPagination}
            type="pagination"
            href=""
            id="numb">
            {index + 1}
          </MyLink>
        </div>
      ))}
      <MyLink href="" type="pagination" onClick={onPagination} id="next">
        <Icon id="nextArrow" iconSize="text-md" />
      </MyLink>
    </div>
  );
};

export default PaginationToggles;
