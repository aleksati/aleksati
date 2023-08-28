import LayoutPage from "../layouts/LayoutPage";
import About from "../templates/About";

export default function handler({ keywords }) {
  return (
    <LayoutPage pageMeta={{ title: "about", keywords }}>
      <About />
    </LayoutPage>
  );
}

About.displayName = "About";

import { getKeysFromFr } from "../functions/loadPosts";
import { frontMatterCache } from "../cache/frontmatter";

export async function getStaticProps() {
  const keywords = getKeysFromFr(frontMatterCache);
  return { props: { keywords } };
}
