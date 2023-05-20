import MyImage from "../components/MyImage";
import SoMeBar from "../components/SoMeBar";

const About = () => (
  <>
    <div className="flex flex-col-2 space-x-4 pb-4 items-start">
      <div>
        <MyImage
          alt="Portrett pic of me"
          isExpandable={true}
          priority={true}
          src="me.jpg"
          width="120" //220
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-lg font-bold">Aleksander Tidemann</h1>
        <p className="text-sm md:text-base">music technologist and developer</p>
        <p className="text-secondary dark:text-secondary-dark text-sm">
          @aleksati @alexfürimmer
        </p>
        <SoMeBar />
      </div>
    </div>
    <div>
      <p>
        Music technology enthusiast, drummer, and software developer from
        Kongsberg, Norway. Curious about all things science and passionate about
        art, exercising, my partner, and our cat.
      </p>
      <br />
      <p>
        I currently work as an engineer for the Musicology Department at the
        University of Oslo (UiO) and lecture two master-level courses on
        Networked Music Performance Technologies. In addition to networked
        interaction, my professional and research interests are mostly in audio,
        video and web programming.
      </p>
      <br />
      <p>
        On the artistic side, I play drums, synths, and live electronics with
        several Oslo-based bands and do some sound-art installation work from
        time to time.
      </p>
    </div>
  </>
);

export default About;
