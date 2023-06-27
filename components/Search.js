import { useCallback, useEffect, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { useKeyPress } from "../hooks/useKeyPress";
import { useRouter } from "next/router";
import SearchItem from "./SearchItem";

const Search = () => {
  const [results, setResults] = useState([]);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");

  const [keyNavIndex, setKeyNavIndex] = useState(0); // this is 1-based! 0 is "nothing"
  const arrowDownPressed = useKeyPress("ArrowDown");
  const arrowUpPressed = useKeyPress("ArrowUp");

  const [ref, isClickOutside] = useClickOutside();

  const resetComponent = useCallback((error = false) => {
    setKeyNavIndex(0);
    setIsError(error);
    setResults([]);
    setQuery("");
  }, []);

  // Ensure that the component re-renders on new url.
  // I also do a variant of this in LayoutPage.js
  const router = useRouter();
  const path = router.query;
  useEffect(() => {
    resetComponent();
  }, [resetComponent, path]);

  // when typing, call the search api and set results
  const onChange = useCallback(
    async (e) => {
      const query = e.target.value;
      setQuery(query);
      try {
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        setResults(data.results);
      } catch (error) {
        resetComponent(true);
        console.log(error);
      }
    },
    [resetComponent]
  );

  // null the search when clicking outside of the search item
  useEffect(() => {
    if (isClickOutside) resetComponent();
  }, [resetComponent, isClickOutside]);

  // handle keypress navigation of search items.
  useEffect(() => {
    if (arrowDownPressed)
      setKeyNavIndex((prevState) =>
        prevState + 1 > results.length ? 1 : prevState + 1
      );

    if (arrowUpPressed)
      setKeyNavIndex((prevState) =>
        prevState - 1 < 1 ? results.length : prevState - 1
      );
  }, [results, arrowDownPressed, arrowUpPressed]);

  return (
    <div className="flex z-50 flex-col w-56 absolute" ref={ref}>
      <input
        className="border-gray-200 dark:border-gray-800 bg-primary-light dark:bg-primary-dark rounded-sm h-8"
        placeholder="search"
        id="search"
        type="search"
        value={query}
        onChange={onChange}
        readOnly={isError}
      />
      {results.length ? (
        <div className="relative max-h-full overflow-y-auto mt-0.5 rounded-sm bg-primary-light dark:bg-primary-dark border-x border-t border-gray-200 dark:border-gray-800">
          {results.map((result, i) => (
            <SearchItem
              type={result.type}
              key={result.slug}
              slug={result.slug}
              title={result.title}
              date={result.date}
              active={i + 1 === keyNavIndex}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

Search.displayName = "Search";

export default Search;
