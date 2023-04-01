import Icon from "./Icon";

const SearchToggle = ({ onClick }) => (
  <a onClick={onClick}>
    <Icon id="search" iconSize="text-md md:text-xl" />
  </a>
);

export default SearchToggle;
