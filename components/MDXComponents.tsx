// import React from "react";
import { finaltest } from "../p5jsSketches/finaltest";
import P5jsContainer from "./P5jsContainer";
import MySpotifyPlayer from "./MySpotifyPlayer";
import MyAudioPlayer from "./MyAudioPlayer";
import MySlideshow from "./MySlideshow";
import MyTable from "./MyTable";
import MyImage from "./MyImage";
import MyLink from "./MyLink";
import MyCode from "./MyCode";
// import SoMeBar from "./SoMeBar";
// import P5SonifyPlot from "./P5SonifyPlot";
// import P5SonifyPlotAmpMod from "./P5SonifyPlotAmpMod";
// import P5SonicOrbs from "./P5SonicOrbs";

interface TextProps<T> {
  children: string;
  object: T;
}

type MDXProps = {
  [key: string]: (props: any) => any;
};

const MDXComponents = {
  MyImage,
  MyLink,
  MyCode,
  MyAudioPlayer,
  MySlideshow,
  MyTable,
  MySpotifyPlayer,
  MyP5App: () => <P5jsContainer sketch={finaltest} />,
  // SoMeBar,
  // P5NoiseDrum,
  // P5SonifyPlot,
  // P5SonifyPlotAmpMod,
  // P5SonicOrbs,
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
