import { date2text } from "../functions/date2text";
import useWindowSize from "../hooks/useWindowSize";
import { KEYWORDS_2_COLOR } from "../config";

// https://tailwindcss.com/docs/customizing-colors

const widthTresh = 768; // tailwind md = 768;

// showType = False , also can be true

const DateAndKeywordViewer = ({ keywords = [], date, type }) => {
  const { width } = useWindowSize();

  // On mobile view, we show less keywords.
  const maxKeywords = width < widthTresh ? 3 : 4;

  return (
    <div className="flex flex-wrap text-sm text-secondary dark:text-secondary-dark space-x-2 items-center">
      <p>{date2text(date, type)}</p>
      {keywords.map(
        (keyword, idx) =>
          idx < maxKeywords && (
            <div className="flex space-x-1 items-center" key={keyword}>
              <p
                className="text-lg"
                style={{ color: `${KEYWORDS_2_COLOR[keyword]}` }}
              >
                •
              </p>
              <p>{keyword}</p>
            </div>
          )
      )}
      {keywords.length && keywords.length > maxKeywords && <p>...</p>}
    </div>
  );
};

export default DateAndKeywordViewer;
