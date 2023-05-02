import LayoutPage from "../layouts/LayoutPage";
import profilePic from "../public/img/portrett.jpg";
import MyImage from "../components/MyImage";
import MyLink from "../components/MyLink";
import Icon from "../components/Icon";
import SoMeBar from "../components/SoMeBar";

export default function About() {
  return (
    <LayoutPage pageMeta={{ title: "about" }}>
      <div className="space-y-2">
        <div className="flex flex-col-2 space-x-4 items-start">
          <div>
            <MyImage src={profilePic} alt="Portrett pic of me" width="110" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">aleksander tidemann</h2>
            <p>music technologist and developer</p>
            <p className="text-secondary dark:text-secondary-dark text-xs">
              aleksandertid (at) gmail
            </p>
            <p className="text-secondary dark:text-secondary-dark text-xs">
              @aleksati @alexfurimmer
            </p>
            <SoMeBar className="space-x-2" />
          </div>
        </div>
        <div>
          <p>
            I am a music technologist, drummer, and software developer from
            Kongsberg, Norway. Curious about all things science and passionate
            about art, exercising, my partner, and our cat.
          </p>
          <br />
          <p>
            In 2021, I Graduated with a master's degree in Music, Communication,
            and Technology (MCT) from the University of Oslo (UiO). Currently, I
            lecture two master-level courses on Networked Music Performances at
            MCT and work as an engineer for the Department of Musicology at UiO.
            In addition to networked interactions, my professional interests are
            in audio-video and web programming.
          </p>
          <br />
          <p>
            On the artistic side, I play drums, synths, and live electronics
            with several Oslo-based bands and do some art installation work from
            time to time.
          </p>
        </div>
      </div>
    </LayoutPage>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
