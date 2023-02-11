import LayoutPage from "../layouts/LayoutPage";
import Image from "next/image";

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative w-full">
          <Image
            src="/img/aleksander.jpg"
            // layout="responsive"
            objectFit="cover"
            fill={true}
            // height="100%"
            // width="100%"
            alt="profile pic"
          />
        </div>
        <div>
          <p>
            I am passionate about music technology, drumming, my partner and our
            cat, and programming. Currently work as a department engineer and
            lecturer at the University of Oslo, specializing in networked audio
            and audio programming.
          </p>
          <br />
          <p>By the way, my name is Aleksander and here are my thingys:</p>
        </div>
      </div>
    </LayoutPage>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
