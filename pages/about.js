import LayoutPage from "../layouts/LayoutPage";
import profilePic from "../public/img/me.jpg";
import MyImage from "../components/MyImage";
import SoMeBar from "../components/SoMeBar";

export default function About() {
  return (
    <LayoutPage pageMeta={{ title: "about" }}>
      <div className="flex flex-col-2 space-x-4 pb-6 items-start">
        <div>
          <MyImage
            alt="Portrett pic of me"
            isExpandable={true}
            src={profilePic}
            priority={true}
            width="180"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Aleksander Tidemann</h3>
          <p className="text-base">music technologist and developer</p>
          <p className="text-secondary dark:text-secondary-dark text-sm">
            @aleksati @alexfürimmer
          </p>
          <SoMeBar className="space-x-2" />
        </div>
      </div>
      <div>
        <p>
          I am a music technology enthusiast, drummer, and software developer
          from Kongsberg, Norway. Curious about all things science and
          passionate about art, exercising, my partner, and our cat.
        </p>
        <br />
        <p>
          In 2021, I Graduated with a master's degree in Music, Communication,
          and Technology (MCT) from the University of Oslo (UiO). Currently, I
          lecture two master-level university courses on Networked Music
          Performances and work as an engineer at the UiO Musicology Department.
          In addition to networked interactions, my professional interests are
          in audio, video and web programming.
        </p>
        <br />
        <p>
          On the artistic side, I play drums, synths, and live electronics with
          several Oslo-based bands and do some sound art installation work from
          time to time.
        </p>
      </div>
    </LayoutPage>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
