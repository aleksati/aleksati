import ModalImage from "./ModalImage";
import { useState } from "react";
import Image, { ImageProps } from "next/image";

// extend from Image?
interface MyImageProps extends ImageProps {
  caption?: string;
  isExpandable?: boolean;
}

const MyImage = ({
  caption,
  isExpandable = false,
  width = 600,
  ...rest
}: MyImageProps): React.JSX.Element => {
  const { height, src } = rest;
  const [modalIsShown, setModalIsShown] = useState(false);
  const handleImgClick = () => setModalIsShown(true);
  const handleModalClose = () => setModalIsShown(false);

  const img = `/img/${src}`;
  const placholder = `/img/placeholders/${src}`;
  const myWidth: number | `${number}` = width ? width : 0;

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="relative">
          <Image
            src={img}
            alt={"myImage"}
            placeholder="blur"
            blurDataURL={placholder}
            width={myWidth}
            height={height ? height : "0"}
            className={`${width ? "" : "w-full"} h-auto m-0 rounded-sm ${
              isExpandable ? "hover:cursor-pointer" : null
            }`}
            unoptimized={true} // this is the only way make gifs work with Image component, I found
            onClick={handleImgClick}
            priority
          />
          {/* {isExpandable ? (
            <div className="absolute rounded-sm top-0 bg-primary-light bg-opacity-50 right-0">
              <ButtonIcon iconId="expand" iconSize="text-sm" />
            </div>
          ) : null} */}
        </div>
        {caption ? (
          <figcaption className={`text-xs w-[${myWidth}px] text-secondary dark:text-secondary-dark`}>
            {/* this sizing doesnt really work.. But when the images are centered, the caption is nice as full post width */}
            {caption}
          </figcaption>
        ) : null}
      </div>
      {modalIsShown && isExpandable && (
        <ModalImage onModalClose={handleModalClose}>
          <Image
            src={img}
            alt="modal image"
            object-fit="cover"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
            placeholder="blur"
            blurDataURL={placholder}
            unoptimized={true} // this is the only way make gifs work with Image component, I found
            quality={100}
            priority
          />
        </ModalImage>
      )}
    </>
  );
};

MyImage.displayName = "MyImage";

export default MyImage;
