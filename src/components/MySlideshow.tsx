import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import MyImage from "./MyImage";
import Icon from "./Icon";

// also includes som css in the global CSS for the indicators
// DOC - https://react-slideshow-image.netlify.app/

const indicators = () => (
  <button
    tabIndex={0}
    className="w-2 h-2 mx-0.5 -mt-4 bg-secondary rounded-full"></button>
);

const properties: object = {
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

type Props = {
  imgs: string[];
  width?: number | null;
  captions?: string[];
  priority?: boolean;
};

const MySlideshow = ({
  imgs = [],
  captions = [],
  width = null,
  priority = false,
}: Props) => {
  const w: string | null = width ? `w-[${width}px]` : null;
  return (
    <div aria-label="slideshow container" className={w}>
      {imgs.length > 1 ? (
        <Slide {...properties} indicators={indicators}>
          {imgs.map((slug, index) => (
            <MyImage
              key={slug}
              src={slug}
              priority={priority}
              alt={`slideshow image of ${slug}`}
              caption={captions ? captions[index] : null}
              width={width ? width : null}
            />
          ))}
        </Slide>
      ) : (
        <MyImage
          src={imgs[0]}
          priority={priority}
          width={width ? width : null}
          alt={`slideshow image of ${imgs[0]}`}
        />
      )}
    </div>
  );
};

export default MySlideshow;
