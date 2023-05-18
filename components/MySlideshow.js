import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import MyImage from "./MyImage";
import Icon from "./Icon";

// also includes som css in the global CSS for the indicators
// DOC - https://react-slideshow-image.netlify.app/

const indicators = (index) => (
  <button
    tabIndex="0"
    className="w-2 h-2 mx-0.5 -mt-4 bg-secondary rounded-full"></button>
);

const properties = {
  autoplay: false,
  canSwipe: true,
  indicators: true,
  transitionDuration: 200,
  defaultIndex: 0,
  // cssClass: "flex flex-col",
  nextArrow: (
    <button
      className="text-primary-dark brightness-50"
      aria-label="next slideshow image">
      <Icon id="nextArrow" />
    </button>
  ),
  prevArrow: (
    <button
      className="text-primary-dark brightness-50"
      aria-label="previous slideshow image">
      <Icon id="prevArrow" />
    </button>
  ),
};

const MySlideshow = ({ imgs = [], captions = [], width = null }) => {
  const w = width ? `w-[${width}px]` : null;
  return (
    <div aria-label="slideshow container" className={w}>
      {imgs.length > 1 ? (
        <Slide {...properties} indicators={indicators}>
          {imgs.map((slug, index) => (
            <MyImage
              src={slug}
              alt={`slideshow image of ${slug}`}
              caption={captions ? captions[index] : null}
              width={width ? width : null}
              key={slug}
            />
          ))}
        </Slide>
      ) : (
        <MyImage
          src={imgs[0]}
          alt={`slideshow image of ${imgs[0]}`}
          width={width ? width : null}
        />
      )}
    </div>
  );
};

export default MySlideshow;
