import Image from "next/image";

const MyImage = (props) => {
  const { caption, ...imgProps } = props;
  return (
    <figure>
      {/* <Image {...props} /> */}
      <img {...imgProps} className="rounded-md" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export default MyImage;
