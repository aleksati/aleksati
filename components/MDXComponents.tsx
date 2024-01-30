import { sonifyplot } from "../p5jsSketches/sonifyplot";
import { sonifyplotampmod } from "../p5jsSketches/sonifyplotampmod";
import { sonicorbs } from "../p5jsSketches/sonicorbs";
import P5jsContainer from "./P5jsContainer";
import MySpotifyPlayer from "./MySpotifyPlayer";
import MyAudioPlayer from "./MyAudioPlayer";
import MySlideshow from "./MySlideshow";
import MyTable from "./MyTable";
import MyImage from "./MyImage";
import MyLink from "./MyLink";
import MyCode from "./MyCode";

interface TextProps<T> {
  children: string;
  object: T;
}

type MDXComponentsProps = {
  [key: string]: (props: any) => React.JSX.Element;
};

const MDXComponents: MDXComponentsProps = {
  MyImage,
  MyLink,
  MyCode,
  MyAudioPlayer,
  MySlideshow,
  MyTable,
  MySpotifyPlayer,
  P5SonifyPlot: () => <P5jsContainer sketch={sonifyplot} />,
  P5SonifyPlotAmpMod: () => <P5jsContainer sketch={sonifyplotampmod} />,
  P5SonicOrbs: () => <P5jsContainer sketch={sonicorbs} />,
  pre: (props: any) => <MyCode {...props} />,
  h1: ({
    children,
    ...h1Props
  }: TextProps<React.ComponentPropsWithoutRef<"h1">>) => {
    // take the title and convert all spaces to "-" and text to lowercase.
    // use this as the id for the h1 tag to enabel navigation through a TOC.
    const childID: string = children.toLowerCase().split(" ").join("-");

    return (
      <h1 id={childID} className="font-bold pt-4 text-2xl mb-2" {...h1Props}>
        {children}
      </h1>
    );
  },
  h2: ({
    children,
    ...h2Props
  }: TextProps<React.ComponentPropsWithoutRef<"h2">>) => {
    // take the title and convert all spaces to "-" and text to lowercase.
    // use this as the id for the h1 tag to enabel navigation through a TOC.
    const childID = children.toLowerCase().split(" ").join("-");
    return (
      <h2 id={childID} className="font-bold text-xl" {...h2Props}>
        {children}
      </h2>
    );
  },
  h3: ({
    children,
    ...h3Props
  }: TextProps<React.ComponentPropsWithoutRef<"h3">>) => {
    // take the title and convert all spaces to "-" and text to lowercase.
    // use this as the id for the h1 tag to enabel navigation through a TOC.
    const childID: string = children.toLowerCase().split(" ").join("-");
    return (
      <h3 id={childID} className="font-bold text-lg" {...h3Props}>
        {children}
      </h3>
    );
  },
  p: ({
    children,
    ...props
  }: TextProps<React.ComponentPropsWithoutRef<"p">>) => (
    <p {...props} className="text-base">
      {children}
    </p>
  ),
};

export default MDXComponents;
