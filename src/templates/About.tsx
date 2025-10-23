import MyImage from "../components/MyImage";
import MySoMeBar from "../components/MySoMeBar";
// import RSSLink from "../components/RSSLink";

const About = () => (
  <div className="pb-6">
    <div className="grid grid-cols-4 gap-2 items-start pb-4">
      <div className="col-span-4 sm:col-span-3">
        <MyImage
          alt="Portrett pic of me"
          isExpandable={true}
          priority={true}
          src="me.jpg"
          padding={false}
          // width="540" // I put a size to the img, even though its sized by the parent div, to speed up first contenfu  l load.
        />
      </div>
      <div className="space-y-1 col-span-4 sm:col-span-4">
        <h1 className="text-lg -mb-1 font-bold">Aleksander Tidemann</h1>
        <p>Sound & Music technologist</p>
        <p className="text-secondary dark:text-secondary-dark text-sm">
          @aleksati @alexfürimmer
        </p>
        <MySoMeBar />
      </div>
    </div>
    <div className="space-y-4">
      <p>
        My name is Aleksander and I am passionate about sound, software and
        science. I live in Oslo with my partner and our cat where I drum for
        various artists and work as an engineer+lecturer for the Musicology
        Department at the University of Oslo. This website is part portfolio and
        part blog, a platform where I share my projects and write about music
        technology, audio programming, networked sound, and much more.
      </p>
      <p>
        Stay updated on my posts by subscribing to my RSS feed from the menubar.
        You can also reach out by leaving comments under each post.
      </p>
    </div>
  </div>
);

export default About;
