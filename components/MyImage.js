import Image from "next/image";

const MyImage = (props) => {
  const { caption, ...imgProps } = props;
  return (
    <figure className="py-2">
      <Image
        {...imgProps}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-auto rounded-sm"
        unoptimized={true} // this is the only way make gifs work with Image component, I found
        quality={100}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export default MyImage;
