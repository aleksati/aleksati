import LayoutPage from "../layouts/LayoutPage";
// import profilePic from "../public/img/me.jpg";
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
            priority={true}
            src={"me.jpg"}
            width="180"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Aleksander Tidemann</h3>
          <p className="text-base">music technologist and developer</p>
          <p className="text-secondary dark:text-secondary-dark text-sm">
            @aleksati @alexfürimmer
          </p>
          <SoMeBar />
        </div>
      </div>
      <div>
        <p>
          Music technology enthusiast, drummer, and software developer from
          Kongsberg, Norway. Curious about all things science and passionate
          about art, exercising, my partner, and our cat.
        </p>
        <br />
        <p>
          I currently work as an engineer for the Musicology Department at the
          University of Oslo (UiO) and lecture two master-level courses on
          Networked Music Performance Technologies. In addition to networked
          interaction, my professional and research interests are mostly in
          audio, video and web programming.
        </p>
        <br />
        <p>
          On the artistic side, I play drums, synths, and live electronics with
          several Oslo-based bands and do some sound-art installation work from
          time to time.
        </p>
      </div>
    </LayoutPage>
  );
}

About.displayName = "About";

export async function getStaticProps() {
  return { props: {} };
}
