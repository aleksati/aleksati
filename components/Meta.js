import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  const newTitle = title ? "aleksati / " + title : "aleksati";

  return (
    <Head>
      <meta name="viewport" content="width=device-width, inital-scale=1" />
      <meta
        name="keywords"
        content={
          keywords ||
          "music technology, music, video, analysis, visuals, art, drums, 5g, embedded systems, audio, sonification, software development, max, maxMSP, jitter, telenor, latency, research, opengl, network, 5g, networked music performances, live performance, ableton live, python, javascript, typescript, nextjs, p5js, nodejs, web, jacktrip, lola, sonobus, midi, motiongrams, kuramoto, synchronization, spectral"
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
