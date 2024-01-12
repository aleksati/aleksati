import MyImage from "../components/MyImage";
import SoMeBar from "../components/SoMeBar";
import MyLink from "../components/MyLink";

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
        I am a music technologist audio developer from Kongsberg, Norway,
        curious about all things science and passionate about art, exercising,
        my partner and our cat. This website is part portfolio and part blog, a
        platform where I share details of my projects and write about other
        creative computing stuff.
      </p>
      <p>
        Currently, I work as a Department Engineer for the Musicology Department
        (IMV) at the University of Oslo (UiO). At IMV I also lecture and
        coordinate two courses on Networked Music Performance Technologies
        (MCT4024 and MCT4025) for the MCT masters programme. On the artistic
        side, I play drums and live electronics for several Oslo-based acts and
        have years of experience as an audio programmer and creative software
        developer.
      </p>
      <p>
        To stay updated on my posts, subscribe to my{" "}
        <MyLink href="/rss.xml">rss feed</MyLink>.
      </p>
    </div>
  </div>
);

export default About;
