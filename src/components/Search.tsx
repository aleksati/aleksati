import { useCallback, useEffect, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { useKeyPress } from "../hooks/useKeyPress";
import { useRouter } from "next/router";
import SearchItem from "./SearchItem";

const Search = () => {
  const [results, setResults] = useState<FrontMatterList>();
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const [keyNavIndex, setKeyNavIndex] = useState<number>(0); // this is 1-based! 0 is "nothing"
  const arrowDownPressed = useKeyPress("ArrowDown");
  const arrowUpPressed = useKeyPress("ArrowUp");

  const [ref, isClickOutside] = useClickOutside<HTMLDivElement>();

  const resetComponent = useCallback((error: boolean) => {
    setKeyNavIndex(0);
    setIsError(error);
    setResults([]);
    setQuery("");
  }, []);

  // Ensure that the Search component re-renders on new url.
  const router = useRouter();
  const path = router.query;
  useEffect(() => {
    resetComponent(false);
  }, [resetComponent, path]);

  // when typing, call the search api and set results
  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const currQ: string = e.target.value;
      setQuery(currQ);
      try {
        const res = await fetch(`/api/search-edge?q=${currQ}`);
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
    if (isClickOutside) resetComponent(false);
  }, [resetComponent, isClickOutside]);

  // handle keypress navigation of search items.
  useEffect(() => {
    if (arrowDownPressed) setKeyNavIndex((prevState) => (prevState + 1 > results.length ? 1 : prevState + 1));

    if (arrowUpPressed) setKeyNavIndex((prevState) => (prevState - 1 < 1 ? results.length : prevState - 1));
  }, [results, arrowDownPressed, arrowUpPressed]);

  return (
    <div className="flex z-50 flex-col w-56 absolute" ref={ref}>
      <input className="border text-base border-gray-200 dark:border-gray-600 bg-primary-light dark:bg-primary-dark rounded-sm h-8" placeholder="search" id="search" type="search" value={query} onChange={onChange} readOnly={isError} autoComplete="off" />
      {/* to edit the height of the results list, edit max-h */}
      {results?.length ? (
        <div className="relative max-h-142 overflow-y-auto mt-0.5 rounded-sm bg-primary-light dark:bg-primary-dark border-x border-t border-gray-200 dark:border-gray-600">
          {results.map((frontMatter, i) => (
            <SearchItem key={frontMatter.slug} fronMatter={frontMatter} isActive={i + 1 === keyNavIndex} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

Search.displayName = "Search";

export default Search;
