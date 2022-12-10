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
      <p>Heia</p>
    </LayoutPage>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
