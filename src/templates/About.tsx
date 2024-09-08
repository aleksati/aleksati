import MyImage from "../components/MyImage";
import MySoMeBar from "../components/MySoMeBar";
import RSSLink from "../components/RSSLink";

const About = () => (
  <div className="pb-10">
    <div className="grid grid-cols-4 gap-4 pb-6 items-start">
      <div className="col-span-4 sm:col-span-1 hidden md:flex">
        <MyImage
          alt="Portrett pic of me"
          isExpandable={true}
          priority={true}
          src="me.jpg"
          width="540" // I put a size to the img, even though its sized by the parent div, to speed up first contenfu  l load.
        />
      </div>
      <div className="space-y-1 col-span-4 sm:col-span-3">
        <h1 className="text-lg -mb-1 font-bold">Aleksander Tidemann</h1>
        <p>Music technologist and software developer</p>
        <p className="text-secondary dark:text-secondary-dark text-sm">
          @aleksati @alexfürimmer
        </p>
        <MySoMeBar />
      </div>
    </div>
    <div className="space-y-4">
      <p>
        I am a music technologist from Norway interested in drumming, MSP, audio
        and web programming, networked music and studio production. Personally
        curious about everything science and passionate about films, philosophy,
        exercising, my partner and our cat. This website is part portfolio and
        part blog, a platform where I share my projects and write about
        music/audio tech stuff.
      </p>
      <p>
        Currently, I work as an engineer for the Musicology Department at the
        University of Oslo. At UiO, I mostly develop long-term musical
        infrastructure, oversee sound studio facilities, teach music technology
        and provide additional research support.
      </p>
      <p>
        Stay updated on my writings by subscribing to the RSS feed. You can also
        reach out by leaving comments under my posts.
      </p>
    </div>
  </div>
);

export default About;
