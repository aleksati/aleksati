import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import MyImage from "./MyImage";
import Icon from "./Icon";

// also includes som css in the global CSS for the indicators

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
  nextArrow: (
    <button className="text-primary-dark" aria-label="next slideshow image">
      <Icon id="nextArrow" iconSize={"text-2xl"} />
    </button>
  ),
  prevArrow: (
    <button className="text-primary-dark" aria-label="previous slideshow image">
      <Icon id="prevArrow" iconSize={"text-2xl"} />
    </button>
  ),
};

const MySlideshow = ({ imgs = [], captions = [] }) => {
  return (
    <div aria-label="slideshow container">
      {imgs.length > 1 ? (
        <Slide {...properties} indicators={indicators}>
          {imgs.map((slug, index) => (
            <MyImage
              src={"/img/" + slug}
              alt={`slideshow image of ${slug}`}
              caption={captions ? captions[index] : null}
              key={slug}
            />
          ))}
        </Slide>
      ) : (
        <MyImage
          src={"/img/" + imgs[0]}
          alt={`slideshow image of ${imgs[0]}`}
        />
      )}
    </div>
  );
};

export default MySlideshow;
