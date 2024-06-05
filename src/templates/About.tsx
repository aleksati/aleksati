import MyImage from "../components/MyImage";
import MySoMeBar from "../components/MySoMeBar";
// import MyLink from "../components/MyLink";

const About = () => (
  <div className="pb-10">
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
        <p>Music technologist and software developer</p>
        <p className="text-secondary dark:text-secondary-dark text-sm">
          @aleksati @alexfürimmer
        </p>
        <MySoMeBar />
      </div>
    </div>
    <div className="space-y-4">
      <p>
        I am a music technologist from Kongsberg, Norway, with many years of
        experience as a musician, studio technician, audio-video programmer and
        web developer. Personally, I am curious about everything science and
        passionate about sound, art, exercising, my partner and our cat. This
        website is part portfolio and part blog, a platform where I share some
        of my projects and write about music tech stuff.
      </p>
      <p>
        Currently, I work as an engineer for the Musicology Department at the
        University of Oslo where I develop long-term infrastructure, oversee
        sound studio facilities, teach networked music and part-take in various
        research activites.
      </p>
      <p>
        To stay updated on my posts, subscribe to my RSS feed from the menubar.
      </p>
    </div>
  </div>
);

export default About;
