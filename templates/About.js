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
        I am a drummer, music technologist, and coding enthusiast from
        Kongsberg, Norway, curious about all things science and passionate about
        art, exercising, my partner and our cat. This site is part portfolio and
        part blog where I share posts about music tech, audio programming,
        networked music, creative computing, software development, and more.
      </p>
      <p>
        Currently, I work as a Department Engineer for the Musicology Department
        (IMV) at the University of Oslo (UiO). At IMV I also lecture and
        coordinate two courses on Networked Music Performance Technologies (
        <MyLink href="https://www.uio.no/studier/emner/hf/imv/MCT4024/index.html">
          MCT4024
        </MyLink>{" "}
        and MCT4025) for the{" "}
        <MyLink href="https://www.uio.no/english/studies/programmes/mct-master/">
          MCT
        </MyLink>{" "}
        masters programme. On the more artistic side, I play drums and live
        electronics for several Oslo-based acts and have years of experience as
        a session musician, improviser, sound designer and music producer.
      </p>
      <p>
        If you want to stay updated on my latest posts, please subscribe to my
        <MyLink href="https://aleksati.net/rss.xml">RSS feed</MyLink>.
      </p>
    </div>
  </>
);

export default About;
