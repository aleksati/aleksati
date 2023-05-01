import Image from "next/image";

const MyImage = (props) => {
  const { caption, width, ...imgProps } = props;
  return (
    <div className="w-full my-2 flex flex-col items-center justify-center">
      <Image
        {...imgProps}
        width={`${width ? width + "" : "0"}`}
        height="0"
        className={`${width ? "" : "w-full"} h-auto m-0 rounded-sm`}
        unoptimized={true} // this is the only way make gifs work with Image component, I found
        quality={100}
      />
      {caption ? <figcaption className="text-xs">{caption}</figcaption> : null}
    </div>
  );
};

export default MyImage;
