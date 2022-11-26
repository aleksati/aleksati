import ButtonTheme from "./ButtonTheme";

const NavRight = () => {
  return (
    <div className="flex place-content-end items-center space-x-2">
      <input
        type="search"
        className="bg-primary-light dark:bg-primary-dark form-search rounded w-36 h-8"
        id="site-search"
        placeholder="&#x1F50E;&#xFE0E; search"
      />
      <ButtonTheme />
    </div>
  );
};

export default NavRight;
