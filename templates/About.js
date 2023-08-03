import MyImage from "../components/MyImage";
import SoMeBar from "../components/SoMeBar";

const About = () => (
  <>
    <div className="flex flex-col-2 space-x-4 pb-6 items-start">
      <div>
        <MyImage
          alt="Portrett pic of me"
          isExpandable={true}
          priority={true}
          src="me.jpg"
          width="220" //220
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-lg font-bold">Aleksander Tidemann</h1>
        <p className="text-sm md:text-base">
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
        I am a drummer, music/sound technology enthusiast, and software
        developer from Kongsberg, Norway, now living in Oslo. Personally curious
        about all things science and passionate about art, exercising, my
        partner, and our cat.
      </p>
      <p>
        I currently work as a Department Engineer for the Musicology Department
        at the University of Oslo (UiO), where I also lecture two master-level
        courses on Networked Music Performances (MCT4024 and MCT4025). In
        addition to networked interaction, my main professional/research
        interests are in audio, video, and web programming.
      </p>
      <p>
        On the artistic side, I have many years of experience playing drums,
        synths, and electronics with several Oslo-based acts. My musical career
        has enabled me to travel the world to play shows on most continents in
        many exciting configurations. But besides the performing arts, my
        biggest artistic ventures are in creative computing and sound-art
        installation work. I spend most of my free time building audio tools,
        embedded systems, websites, various analysis tools, controllers, and
        more.
      </p>
      <p>
        This page is one of my projects, part portfolio and part blog. It's a
        futile attempt to document and share as much knowledge on music
        tech-related matters as I can, drawing from an extremely broad (and
        ever-expanding) experience in the field. Hope you find it useful, one
        way or another.
      </p>
    </div>
  </>
);

export default About;
