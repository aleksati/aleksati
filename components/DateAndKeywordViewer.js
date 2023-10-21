import { date2text } from "../functions/date2text";
import useWindowSize from "../hooks/useWindowSize";
import { KEYWORDS_2_COLOR } from "../config";

// https://tailwindcss.com/docs/customizing-colors

const widthTresh = 768; // tailwind md = 768;

const DateAndKeywordViewer = ({
  keywords = [],
  date,
  type,
  text = "sm",
  showDate = true,
  showType = false,
  showKeywords = true,
}) => {
  // On mobile view, we show less keywords.
  const { width } = useWindowSize();
  const maxKeywords = width < widthTresh ? 3 : 4;

  if (text === "sm") {
    return (
      <div className="flex flex-wrap text-sm text-secondary dark:text-secondary-dark space-x-2 items-center">
        {showType ? (
          <div className="flex space-x-2 items-center">
            <p>{type}</p> <p className="text-lg">•</p>
          </div>
        ) : null}
        {showDate ? <p>{date2text(date)}</p> : null}
        {showKeywords ? (
          <>
            {keywords.map(
              (keyword, idx) =>
                idx < maxKeywords && (
                  <div className="flex space-x-1 items-center" key={keyword}>
                    <p
                      className="text-lg"
                      style={{ color: `${KEYWORDS_2_COLOR[keyword]}` }}>
                      •
                    </p>
                    <p>{keyword}</p>
                  </div>
                )
            )}
            {keywords.length && keywords.length > maxKeywords && <p>...</p>}
          </>
        ) : null}
      </div>
    );
  }

  if (text === "xs") {
    return (
      <div className="flex flex-wrap text-xs text-secondary dark:text-secondary-dark space-x-2 items-center">
        {showType ? (
          <div className="flex space-x-2 items-center">
            <p>{type}</p> <p className="text-md">•</p>
          </div>
        ) : null}
        {showDate ? <p>{date2text(date)}</p> : null}
        {showKeywords ? (
          <>
            {keywords.map(
              (keyword, idx) =>
                idx < maxKeywords && (
                  <div className="flex space-x-1 items-center" key={keyword}>
                    <p
                      className="text-md"
                      style={{ color: `${KEYWORDS_2_COLOR[keyword]}` }}>
                      •
                    </p>
                    <p>{keyword}</p>
                  </div>
                )
            )}
            {keywords.length && keywords.length > maxKeywords && <p>...</p>}
          </>
        ) : null}
      </div>
    );
  }
};

export default DateAndKeywordViewer;
