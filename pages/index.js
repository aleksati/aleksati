import LayoutPage from "../layouts/LayoutPage";
import About from "../templates/About";

export default function handler({ keywords }) {
  return (
    <LayoutPage pageMeta={{ keywords }}>
      <About />
    </LayoutPage>
  );
}

// About.displayName = "About";

import { getKeysFromFr, getAllFr } from "../functions/loadPosts";

export async function getStaticProps() {
  // get frontMatter form all posts
  const frontMatter = getAllFr();
  // get all used keywords in array
  const keywords = getKeysFromFr(frontMatter);
  return { props: { keywords } };
}
