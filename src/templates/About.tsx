import MyImage from "../components/MyImage";
import MySoMeBar from "../components/MySoMeBar";
// import RSSLink from "../components/RSSLink";

const About = () => (
  <div className="pb-6">
    <div className="grid grid-cols-4 gap-4 pb-6 items-start">
      <div className="col-span-4 sm:col-span-1 flex md:flex">
        <MyImage
          alt="Portrett pic of me"
          isExpandable={true}
          priority={true}
          src="me.jpg"
          // width="540" // I put a size to the img, even though its sized by the parent div, to speed up first contenfu  l load.
        />
      </div>
      <div className="space-y-1 col-span-4 sm:col-span-3">
        <h1 className="text-lg -mb-1 font-bold">Aleksander Tidemann</h1>
        <p>Music technologist and developer</p>
        <p className="text-secondary dark:text-secondary-dark text-sm">
          @aleksati @alexfürimmer
        </p>
        <MySoMeBar />
      </div>
    </div>
    <div className="space-y-4">
      <p>
        My name is Aleksander and I am passionate about music, software and
        science. I live in Oslo where I play drums for various artists and work
        as an engineer and lecturer for the Musicology Department at the University of
        Oslo. This website is part portfolio and part blog, a platform where I
        share my projects and write about audio programming and music tech.
      </p>
      <p>
        Stay updated on my posts by subscribing to my RSS feed from the menubar.
        You can also reach out by leaving comments under each posts.
      </p>
    </div>
  </div>
);

export default About;
