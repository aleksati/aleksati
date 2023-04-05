import { useCallback, useEffect, useRef, useState } from "react";
import { date2text } from "../functions/date2text";
import Link from "next/link";

const Search = ({ focusOnMount = false, onMobileClickOutside = () => {} }) => {
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isResults, setIsResults] = useState(false);
  const [isError, setIsError] = useState(false);

  // set OnMount to avoid clickhandler closing the searchbar
  // immediatly when first clicking the hourglass icon.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // when typing, call the search api and set results
  const onChange = useCallback(async (e) => {
    const query = e.target.value;
    setQuery(query);
    try {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data.results);
      setIsResults(data.results.length ? true : false);
    } catch (error) {
      setResults([]);
      setIsResults(false);
      setIsError(true);
      console.log(error);
    }
  }, []);

  // for mobile view:
  // focus the search bar onMount so you can just start typing
  // immediatly when hitting the hour-glass.
  useEffect(() => {
    if (inputRef.current && focusOnMount) {
      inputRef.current.focus();
    }
  }, [inputRef, focusOnMount]);

  // to remove the search results window when a user clicks
  // outside the results window. I raise the event to NavTop to
  // close the whole search function from there.
  const handleClickOutside = useCallback(
    (e) => {
      if (!isMounted) return;
      if (searchRef.current && searchRef.current.contains(e.target)) return;
      onMobileClickOutside();
      setIsResults(false);
      setResults([]);
      setQuery("");
    },
    [
      onMobileClickOutside,
      searchRef,
      isMounted,
      setResults,
      setIsResults,
      setQuery,
    ]
  );

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className="w-full" ref={searchRef}>
      <input
        className="form-search bg-primary-light dark:bg-primary-dark rounded-sm w-full h-8"
        placeholder="&#x1F50E;&#xFE0E; search posts .."
        id="search"
        type="search"
        ref={inputRef}
        value={query}
        onChange={onChange}
        readOnly={isError}
      />
      {isResults ? (
        <div className="absolute mr-4 mt-0.5 rounded-sm bg-primary-light dark:bg-primary-dark border-x border-t border-secondary">
          <ul>
            {results.map((result) => (
              <li
                key={result.slug}
                className="border-b hover:bg-blue-200 hover:dark:bg-blue-800 border-secondary p-2 hover:cursor-pointer"
              >
                <Link href={`/posts/${result.slug}`}>{result.title}</Link>
                <p className="text-secondary text-xs">
                  {date2text(result.date)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
