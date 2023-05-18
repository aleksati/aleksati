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
  h1: (props) => {
    // take the title and convert all spaces to "-" and text to lowercase.
    // use this as the id for the h1 tag to enabel navigation through a TOC.
    const { children, ...h1Props } = props;
    const childID = children.toLowerCase().split(" ").join("-");
    return (
      <h1 id={childID} className="font-bold pt-4 text-2xl mb-2" {...h1Props}>
        {props.children}
      </h1>
    );
  },
  h2: (props) => {
    // take the title and convert all spaces to "-" and text to lowercase.
    // use this as the id for the h1 tag to enabel navigation through a TOC.
    const { children, ...h2Props } = props;
    const childID = children.toLowerCase().split(" ").join("-");
    return (
      <h2 id={childID} className="font-bold text-xl" {...h2Props}>
        {props.children}
      </h2>
    );
  },
  h3: (props) => {
    // take the title and convert all spaces to "-" and text to lowercase.
    // use this as the id for the h1 tag to enabel navigation through a TOC.
    const { children, ...h3Props } = props;
    const childID = children.toLowerCase().split(" ").join("-");
    return (
      <h3 id={childID} className="font-bold text-lg" {...h3Props}>
        {props.children}
      </h3>
    );
  },
  p: (props) => <p className="text-base">{props.children}</p>,
};

export default MDXComponents;
