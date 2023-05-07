import { useClickOutside } from "../hooks/useClickOutside";
import ClientOnlyPortal from "./ClientOnlyPortal";
import { useState, useRef } from "react";
import ButtonIcon from "./ButtonIcon";
import Image from "next/image";

const MyImage = (props) => {
  const { caption, width, height, isExpandable, src, ...imgProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [ref, isClickOutside] = useClickOutside();

  console.log(isClickOutside);

  const handleClick = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      <div className="w-full my-2 flex flex-col justify-center">
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
          onClick={handleClick}
        />
        {caption ? (
          <figcaption className="text-sm text-secondary dark:text-secondary-dark">
            {caption}
          </figcaption>
        ) : null}
      </div>
      {isOpen && isExpandable && (
        <ClientOnlyPortal selector="#modal">
          <aside
            tag="aside"
            role="dialog"
            className="fixed backdrop-brightness-50 inset-0 z-50 flex items-center justify-center">
            <div
              ref={ref}
              className="max-h-full overflow-auto p-4 max-w-2xl bg-primary-light dark:bg-primary-dark">
              <div className="flex place-content-end">
                <ButtonIcon
                  // ref={closeBtnRef}
                  aria-label="Close Modal"
                  // onClick={closeModal}
                  iconId="x"
                />
              </div>
              <Image
                alt="modal image"
                src={src}
                object-fit="cover"
                className="p-4"
                unoptimized={true} // this is the only way make gifs work with Image component, I found
                quality={100}
                onClick={handleClick}
              />
            </div>
          </aside>
        </ClientOnlyPortal>
      )}
    </>
  );
};

export default MyImage;
