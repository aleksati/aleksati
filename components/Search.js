import { useCallback, useEffect, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
// import { useScrollLock } from "../hooks/useScrollLock";
import { useKeyPress } from "../hooks/useKeyPress";
import SearchItem from "./SearchItem";
import { useRouter } from "next/router";

const Search = () => {
  // const [isResults, setIsResults] = useState(false);
  const [results, setResults] = useState([]);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");

  const [keyNavIndex, setKeyNavIndex] = useState(0); // this is 1-based! 0 is "nothing"
  const arrowDownPressed = useKeyPress("ArrowDown");
  const arrowUpPressed = useKeyPress("ArrowUp");

  const [ref, isClickOutside] = useClickOutside();
  // const { unlockScroll, lockScroll } = useScrollLock();

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
  const onChange = useCallback(async (e) => {
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
  }, []);

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

  // disable scrolling when searching so keydown does not scroll the page.
  // still issues here..
  // useEffect(() => {
  //   if (results.length) {
  //     lockScroll();
  //   } else {
  //     unlockScroll();
  //   }
  //   return () => unlockScroll();
  // }, [results]);

  return (
    <div className="w-full" ref={ref}>
      <input
        className="form-search border-gray-200 dark:border-gray-800 w-full bg-primary-light dark:bg-primary-dark rounded-sm h-8"
        placeholder="&#x1F50E;&#xFE0E; search posts"
        id="search"
        type="search"
        value={query}
        onChange={onChange}
        readOnly={isError}
      />
      {results.length ? (
        <div className="absolute mr-4 mt-0.5 rounded-sm bg-primary-light dark:bg-primary-dark border-x border-t border-gray-200 dark:border-gray-800">
          {results.map((result, i) => (
            <SearchItem
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

export default Search;
