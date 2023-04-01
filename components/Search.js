import { useEffect, useRef } from "react";

const Search = ({ focusOnMount = false }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && focusOnMount) {
      inputRef.current.focus();
    }
  }, [inputRef, focusOnMount]);

  return (
    <input
      className="form-search bg-primary-light dark:bg-primary-dark rounded-sm w-full h-8"
      placeholder="search ..."
      id="search"
      type="search"
      ref={inputRef}
    />
  );
};

export default Search;
