import Image from "next/image";

const MyImage = (props) => {
  const { caption, ...imgProps } = props;
  return (
    <figure>
      <Image
        {...imgProps}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-auto"
        quality={100}
      />
      {/* <img {...imgProps} className="rounded-md" quality={100} /> */}
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export default MyImage;
