import MyImage from "../components/MyImage";
import MySoMeBar from "../components/MySoMeBar";
// import RSSLink from "../components/RSSLink";
import MyLink from "../components/MyLink";

const About = () => (
  <div className="pb-6">
    <div className="grid grid-cols-2 gap-4 md:gap-16 items-start">
      <div className="col-span-2 md:col-span-1">
        <MyImage
          alt="Portrett pic of me"
          isExpandable={true}
          // preload={true}
          // src="me.jpg"
          src="me2.jpg"
          padding={false}
          // width="540" // I put a size to the img, even though its sized by the parent div, to speed up first contenfu  l load.
        />
      </div>
      {/* <div className="space-y-1 col-span-2 sm:col-span-2 items-center"> */}
      {/* <h1 className="text-lg -mb-1">Music Technologist</h1> */}
      {/* <p>Music technologist</p> */}
      {/* <p className="text-secondary dark:text-secondary-dark text-sm">
          @aleksati @alexfürimmer
        </p>
        <MySoMeBar /> */}
      {/* </div> */}
      <div className="space-y-4 col-span-2 md:col-span-1">
        <div className="flex flex-col space-y-1 items-center justify-center md:items-start">
          <h1 className="font-bold text-lg -mb-1">Aleksander Tidemann</h1>
          <div>
            <p>Music Technologist</p>
            <MySoMeBar />
            <p className="text-secondary dark:text-secondary-dark text-sm">
              @aleksati @alexfürimmer
            </p>
          </div>
        </div>
        <p>
          My name is Aleksander and I'm a senior engineer and lecturerer in music technology at the Department of Musicology, University of Oslo. My
          work sits at the intersection between sound, software, and science,
          with a particular focus on audio programming, networked sound and studios. Outside of work, I play drums, produce music for
          various acts, and try to read a little every day. This website is both
          a portfolio and a blog, a place where I share projects and write about
          music technology and related explorations.
        </p>
        <p>
          Stay updated on my posts by subscribing to my RSS feed from the
          menubar. You can also get in touch by leaving comments under my posts.
        </p>
        {/* <div className="flex flex-col items-center justify-center md:justify-start">
          <p className="font-bold text-lg">Social</p>

          <MySoMeBar />
          <p className="text-secondary dark:text-secondary-dark text-md">
            @aleksati @alexfürimmer
          </p>
        </div> */}
        <div className="flex flex-col space-y-2 items-start">
          <p className="">Current and past university teachings:</p>
          <MyLink href="https://www.uio.no/studier/emner/hf/imv/MUS2850/">
            MUS2850 - Computer Music
          </MyLink>

          <MyLink href="https://www.uio.no/studier/emner/hf/imv/MCT4054/">
            MCT4054 - Interactive Music Systems
          </MyLink>

          <MyLink href="https://www.uio.no/studier/emner/hf/imv/MCT4024/index.html">
            MCT4024 - Networked Music 1
          </MyLink>

          <MyLink href="https://www.uio.no/studier/emner/hf/imv/MCT4025/index.html">
            MCT4025 - Networked Music 2
          </MyLink>
          <br />
        </div>
      </div>
    </div>
  </div>
);

export default About;
