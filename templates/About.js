import MyImage from "../components/MyImage";
import SoMeBar from "../components/SoMeBar";
import MyLink from "../components/MyLink";

const About = () => (
  <>
    <div className="grid grid-cols-4 gap-4 pb-6 items-start">
      <div className="col-span-4 sm:col-span-1">
        <MyImage
          alt="Portrett pic of me"
          isExpandable={true}
          priority={true}
          src="me.jpg"
        />
      </div>
      <div className="space-y-1 col-span-4 sm:col-span-3">
        <h1 className="text-lg font-bold">Aleksander Tidemann</h1>
        <p className="text-base">
          Engineer and University Lecturer, specializing in networked music and
          audio programming
        </p>
        <p className="text-secondary dark:text-secondary-dark text-sm">
          @aleksati @alexfürimmer
        </p>
        <SoMeBar />
      </div>
    </div>
    <div className="space-y-4">
      <p>
        I am a drummer, music technologist, and software enthusiast living in
        Oslo, Norway. Personally curious about all things science and passionate
        about art, exercising, my partner, and our cat. My current work is as a
        Department Engineer for the Musicology Department at the University of
        Oslo (UiO). There I also lecture and coordinate two courses on Networked
        Music Performance Technologies (
        <MyLink href="https://www.uio.no/studier/emner/hf/imv/MCT4024/index.html">
          MCT4024
        </MyLink>{" "}
        and MCT4025) for the MCT masters programme.
        {/* In addition to networked
        interaction, I would characterize my main professional/research
        interests to be audio, video, and web programming. */}
      </p>
      <p>
        On the artistic side, I have many years of experience playing drums,
        synths, and electronics with several Oslo-based acts. My musical career
        has enabled me to travel and play shows on most continents in many
        exciting constellations. But besides the performing arts, my biggest
        artistic ventures are in creative computing and sound-art installation
        work. I spend most of my free time building audio-visual tools, small
        embedded systems, websites, various analysis apps, controllers, and
        more.
      </p>
      <p>
        This page is one of my projects, part portfolio and part blog. It's a
        futile attempt to document and share as much knowledge on music
        tech-related matters as I can, drawing from an extremely broad (and
        ever-expanding) experience in the field. Hope you find it a tiny bit
        helpful.
      </p>
    </div>
  </>
);

export default About;
