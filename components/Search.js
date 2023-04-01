import React from "react";

const Search = ({ showSearch, showBigSearch, showSmallSearch = true }) => {
  if (showSearch) {
    if (showBigSearch) {
      return (
        <input
          className="form-search resize bg-primary-light dark:bg-primary-dark rounded-sm h-8 w-36"
          placeholder="&#x1F50E;&#xFE0E; search"
          id="search"
          type="search"
        />
      );
    }
    if (showSmallSearch) {
      return (
        <div className="w-1/1">
          <input
            className="form-search resize bg-primary-light dark:bg-primary-dark rounded-sm h-8 w-full"
            placeholder="&#x1F50E;&#xFE0E; search"
            id="search"
            type="search"
          />
        </div>
      );
    }
  }
};

{
  /* <p>&#x1F50E;&#xFE0E;</p>; */
}

export default Search;
