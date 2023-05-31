import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  const newTitle = title ? "aleksati | " + title : "aleksati";

  return (
    <Head>
      <meta name="viewport" content="width=device-width, inital-scale=1" />
      <meta
        name="keywords"
        content={
          [...keywords] ||
          "music technology, music, video, analysis, software development, max, maxMSP, audio, opengl, network, 5g, networked music performances, research, live performance, ableton live, python, javascript, typescript, nextjs, vuejs, p5js, nodejs, web, jacktrip, lola, sonobus, midi, motiongrams"
        }
      />
      <meta
        name="description"
        content={description || "Official homepage of Aleksander Tidemann"}
      />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{newTitle}</title>
    </Head>
  );
};

export default Meta;
