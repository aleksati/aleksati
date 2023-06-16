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
        Music/sound technologist, drummer, and software developer from Norway.
        Curious about all things science and passionate about art, exercising,
        my partner and our cat.
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
        On the artistic side, I have years of experience playing drums, synths,
        and live electronics with multiple Oslo-based acts. However, my most
        recent and exciting interests are creative computing and sound-art
        installation work.
      </p>
    </div>
  </>
);

export default About;
