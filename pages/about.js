import LayoutPage from "../layouts/LayoutPage";
import profilePic from "../public/img/aleksander.jpg";
import Image from "next/image";
import SoMeBar from "../components/SoMeBar";

const pageMeta = {
  title: "tidemann.xyz",
  keywords:
    "music technology, music, software development, networked audio, programming",
  description: "Official homepage of Aleksander Tidemann ",
  url: "?",
};

export default function About() {
  return (
    <LayoutPage pageMeta={pageMeta}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:-mx-8 mx-auto">
        <div className="hidden md:flex">
          <Image
            src={profilePic}
            layout="responsive"
            // objectFit="contain"
            alt="portrait picture"
          />
        </div>
        <div>
          <h1 className="text-7xl">hello, </h1>
          <p>
            I work as an engineer and lecturer at the University of Oslo,
            specializing in networked audio and audio programming. Curious about
            all things science and passionate about music, exercising, my
            partner and our cat.
          </p>
          <br />
          <p>Oh, and my name is Aleksander.</p>
          <SoMeBar iconSize={"text-2xl"} className="pt-2" />
        </div>
      </div>
    </LayoutPage>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
