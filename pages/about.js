import LayoutPage from "../layouts/LayoutPage";
import profilePic from "../public/img/portrett.jpg";
import MyImage from "../components/MyImage";
import MyLink from "../components/MyLink";
import Icon from "../components/Icon";

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
          <br />
          <h2 className="text-2xl font-bold pb-4">online</h2>
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 items-center">
              <Icon id="github" />
              <MyLink href="https://github.com/aleksati">github</MyLink>
            </div>
            <div className="flex space-x-2 items-center">
              <Icon id="mastodon" />
              <MyLink href="https://sigmoid.social/@aleksati">mastodon</MyLink>
            </div>
            <div className="flex space-x-2 items-center">
              <Icon id="instagram" />
              <MyLink href="https://www.instagram.com/alexfurimmer">
                instagram
              </MyLink>
            </div>
            <div className="flex space-x-2 items-center">
              <Icon id="linkedin" />
              <MyLink href="https://www.linkedin.com/in/aleksander-tidemann-b4667816b">
                linkedin
              </MyLink>
            </div>
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
