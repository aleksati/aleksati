import LayoutPage from "../layouts/LayoutPage";
import Music from "../templates/Music";

export default function handler() {
  return (
    <LayoutPage pageMeta={{ title: "music" }}>
      <Music />
    </LayoutPage>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
