import MyImage from "../components/MyImage";
import MySoMeBar from "../components/MySoMeBar";
// import RSSLink from "../components/RSSLink";
import MyLink from "../components/MyLink";

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
        <p>Music technologist</p>
        <p className="text-secondary dark:text-secondary-dark text-sm">
          @aleksati @alexfürimmer
        </p>
        <MySoMeBar />
      </div>
    </div>
    <div className="space-y-4">
      <p>
        My name is Aleksander and I’m a musician and senior engineer in music
        technology at the Department of Musicology, University of Oslo. My work
        sits at the intersection between sound, software, and science, with a
        particular focus on audio programming and networked sound. Outside of
        work, I play drums, produce music with friends, and try to read a little
        every day. This website is both a portfolio and a blog, a place where I
        share projects and write about music technology and related
        explorations.
      </p>
      <p>
        Stay updated on my posts by subscribing to my RSS feed from the menubar.
        You can also reach out by leaving comments under each post.
      </p>
      <div>
        <p>Teachings:</p>
        • <MyLink href="https://www.uio.no/studier/emner/hf/imv/MUS2850/">MUS2850 - Computer Music</MyLink> <br/>
        • <MyLink href="https://www.uio.no/studier/emner/hf/imv/MCT4054/">MCT4054 - Interactive Music Systems</MyLink> <br/>
        • <MyLink href="https://www.uio.no/studier/emner/hf/imv/MCT4024/index.html">MCT4024 - Networked Music Performance Technologies 1</MyLink> <br/>
        • <MyLink href="https://www.uio.no/studier/emner/hf/imv/MCT4025/index.html">MCT4024 - Networked Music Performance Technologies 2</MyLink> <br/>
      </div>
    </div>
  </div>
);

export default About;
