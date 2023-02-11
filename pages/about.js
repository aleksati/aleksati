import LayoutPage from "../layouts/LayoutPage";

const pageMeta = {
  title: "Aleksander Tidemann",
  keywords:
    "music technology, software development, networked music performance",
  description: "Official homepage of Aleksander Tidemann ",
  url: "?",
};

export default function About() {
  return (
    <LayoutPage showSearchAndTheme={true} pageMeta={pageMeta}>
      <p>
        I am passionate about music technology, drumming, my partner and our
        cat, and programming. Currently work as a department engineer and
        lecturer at the University of Oslo, specializing in networked audio and
        audio programming.
      </p>
      <br />
      <p>By the way, my name is Aleksander and here are my thingys:</p>
    </LayoutPage>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
