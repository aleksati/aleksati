import { useCallback, useEffect, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { date2text } from "../functions/date2text";
import Link from "next/link";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isResults, setIsResults] = useState(false);
  const [isError, setIsError] = useState(false);

  const [ref, isClickOutside] = useClickOutside();

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

  // null the search when clicking outside.
  useEffect(() => {
    if (isClickOutside) {
      setIsResults(false);
      setResults([]);
      setQuery("");
    }
  }, [isClickOutside]);

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
      {isResults ? (
        <div className="absolute mr-4 mt-0.5 rounded-sm bg-primary-light dark:bg-primary-dark border-x border-t border-gray-200 dark:border-gray-800">
          <ul>
            {results.map((result) => (
              <li
                key={result.slug}
                className="border-b hover:bg-blue-200 hover:dark:bg-blue-800 border-gray-200 dark:border-gray-800 p-2 hover:cursor-pointer">
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
