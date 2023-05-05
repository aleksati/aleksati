import Image from "next/image";

const MyImage = (props) => {
  const { caption, width, height, ...imgProps } = props;
  return (
    <div className="w-full my-2 flex flex-col justify-center">
      <Image
        {...imgProps}
        width={width ? width + "" : "0"}
        height={height ? height : "0"}
        className={`${width ? "" : "w-full"} h-auto m-0 rounded-sm`}
        unoptimized={true} // this is the only way make gifs work with Image component, I found
        quality={100}
      />
      {caption ? (
        <figcaption className="text-sm text-secondary dark:text-secondary-dark">
          {caption}
        </figcaption>
      ) : null}
    </div>
  );
};

export default MyImage;
