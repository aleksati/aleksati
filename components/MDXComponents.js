import MyAudioPlayer from "./MyAudioPlayer";
import MySlideshow from "./MySlideshow";
import MyTable from "./MyTable";
import MyImage from "./MyImage";
import MyLink from "./MyLink";
import MyCode from "./MyCode";

const MDXComponents = {
  MyImage,
  MyLink,
  MyCode,
  MyAudioPlayer,
  MySlideshow,
  MyTable,
  pre: (props) => <MyCode {...props} />,
  // h1: (props) => <h1 className="text-4xl font-bold" {...props}></h1>,
};

export default MDXComponents;
