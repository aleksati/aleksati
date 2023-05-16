import ButtonIcon from "./ButtonIcon";
import ModalImage from "./ModalImage";
import { useState } from "react";
import Image from "next/image";

const MyImage = (props) => {
  const { caption, width, height, isExpandable, src, ...imgProps } = props;
  const [modalIsShown, setModalIsShown] = useState(false);
  const handleImgClick = () => setModalIsShown(true);
  const handleModalClose = () => setModalIsShown(false);

  return (
    <>
      <div className="w-full flex flex-col justify-center">
        <div className="relative">
          <Image
            {...imgProps}
            src={src}
            width={width ? width + "" : "0"}
            height={height ? height : "0"}
            className={`${width ? "" : "w-full"} h-auto m-0 rounded-sm ${
              isExpandable ? "hover:cursor-pointer" : null
            }`}
            unoptimized={true} // this is the only way make gifs work with Image component, I found
            quality={100}
            onClick={handleImgClick}
          />
          {isExpandable ? (
            <div className="absolute rounded-sm top-0 bg-primary-light bg-opacity-50 right-0">
              <ButtonIcon iconId="expand" />
            </div>
          ) : null}
        </div>
        {caption ? (
          <figcaption className="text-sm text-secondary dark:text-secondary-dark">
            {caption}
          </figcaption>
        ) : null}
      </div>
      {modalIsShown && isExpandable && (
        <ModalImage onModalClose={handleModalClose}>
          <Image
            alt="modal image"
            src={src}
            object-fit="cover"
            unoptimized={true} // this is the only way make gifs work with Image component, I found
            quality={100}
          />
        </ModalImage>
      )}
    </>
  );
};

export default MyImage;
