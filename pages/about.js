import LayoutPage from "../layouts/LayoutPage";
import profilePic from "../public/img/portrett.jpg";
import MyImage from "../components/MyImage";
import MyLink from "../components/MyLink";

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mx-auto">
        <div>
          <div>
            <h2 className="text-2xl font-bold pb-4">hello</h2>
            <p>
              I am a music technologist and university lecturer living in Oslo,
              Norway. Curious about all things science and passionate about art,
              exercising, my partner and our cat.
            </p>
            <br />
            <p>
              My main interests are in networked interactions and audio-video
              programming. Currently I work as an engineer at the University of
              Oslo.
            </p>
          </div>
          <br />
          <div className="text-sm flex flex-col items-start">
            <MyLink type="text" href="">
              GitHub
            </MyLink>
            <MyLink type="text" href="">
              Mastadon
            </MyLink>
            <MyLink type="text" href="">
              Instagram
            </MyLink>
            <MyLink type="text" href="">
              Linkedin
            </MyLink>
          </div>
        </div>
        <div className="hidden md:flex">
          <MyImage src={profilePic} />
        </div>
      </div>
    </LayoutPage>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
