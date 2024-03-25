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
        <p>
          Music technologist and software developer
        </p>
        <p className="text-secondary dark:text-secondary-dark text-sm">
          @aleksati @alexfürimmer
        </p>
        <MySoMeBar />
      </div>
    </div>
    <div className="space-y-4">
      <p> I am a music technologist and software developer from Kongsberg, Norway, with many years of experience as a musician, multimedia (audio-video) programmer and web developer. I am overly curious about science and technology, and passionate about music, art, exercising, my partner and our cat. This website is part portfolio and part blog, a platform where I share my projects, thoughts and write about music/audio tech stuff.
      </p>
      <p>
      Currently, I work as a Department Engineer at the University of Oslo. Here, I develop long-term infrastructure strategies in teams, teach two ten-credit master-level courses on advanced audio-visual networking and programming, and part-take in various research-related activities.
      </p>
      <p>To stay updated on my posts, subscribe to my rss feed.</p>
    </div>
  </div>
);

export default About;
