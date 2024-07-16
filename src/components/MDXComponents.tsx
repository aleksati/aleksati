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
import MyH1 from "./MyH1";
import MyH2 from "./MyH2";
import MyH3 from "./MyH3";
import MyP from "./MyP";

// type MDXComponentsProps = {
//   [key: string]: (props: any) => React.JSX.Element;
// };

const MDXComponents: object = {
  MyImage,
  MyLink,
  MyCode,
  MyAudioPlayer,
  MySlideshow,
  MyTable,
  MySpotifyPlayer,
  P5SonifyPlotAmpMod: () => <P5jsContainer sketch={sonifyplotampmod} />,
  P5SonicOrbs: () => <P5jsContainer sketch={sonicorbs} />,
  pre: (props: any) => <MyCode {...props} />,
  h1: (props: any) => <MyH1 {...props} />,
  h2: (props: any) => <MyH2 {...props} />,
  h3: (props: any) => <MyH3 {...props} />,
  p: (props: any) => <MyP {...props} />,
};

export default MDXComponents;
