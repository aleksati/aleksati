import LayoutPage from "../layouts/LayoutPage";
import profilePic from "../public/img/portrett.jpg";
import MyImage from "../components/MyImage";

export default function About() {
  return (
    <LayoutPage pageMeta={{ title: "about" }}>
      <h2 className="text-2xl font-bold pb-4">aleksander tidemann</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mx-auto">
        <div>
          <div>
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
        </div>
        <div className="hidden md:flex">
          <MyImage src={profilePic} alt="Portrett pic of me" />
        </div>
      </div>
    </LayoutPage>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
