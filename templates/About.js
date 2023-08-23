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
          width="540" // I put a size to the img, even though its sized by the parent div, to speed up first contenfu  l load.
        />
      </div>
      <div className="space-y-1 col-span-4 sm:col-span-3">
        <h1 className="text-lg font-bold">Aleksander Tidemann</h1>
        <p className="text-base">
          Engineer and University lecturer, specializing in networked music and
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
        I am a drummer, music technologist, and coding enthusiast living in
        Oslo, Norway. Personally curious about all things science and passionate
        about art, exercising, my partner, and our cat. My current work is as a
        Department Engineer for the Musicology Department at the University of
        Oslo (UiO). There I also lecture and coordinate two courses on Networked
        Music Performance Technologies (
        <MyLink href="https://www.uio.no/studier/emner/hf/imv/MCT4024/index.html">
          MCT4024
        </MyLink>{" "}
        and MCT4025) for the MCT masters programme.
      </p>
      <p>
        On the more artistic side, I play drums and live electronics for several
        Oslo-based acts and have years of experience as a session musician,
        improviser, sound designer and music producer. But besides the
        performing arts, my biggest artistic ventures are in creative computing,
        sound-art installation work and software development. I spend most of my
        free time building audio-visual tools, small embedded systems, websites,
        analysis apps, controllers, and more.
      </p>
      <p>
        This page is one of my projects, part portfolio and part blog. It's an
        attempt to document and share as much knowledge on music tech-related
        matters as I can, drawing from a broad (and ever-expanding) experience
        in the field. Hope you find it helpful.
      </p>
    </div>
  </>
);

export default About;
