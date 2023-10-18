import LayoutPage from "../layouts/LayoutPage";
import About from "../templates/About";

export default function handler({ keywords }) {
  return (
    <LayoutPage pageMeta={{ title: "about", keywords }}>
      <About />
    </LayoutPage>
  );
}

import generateRSS from "../scripts/generateRSS";
import { getKeysFromFr } from "../functions/loadPosts";
import { frontMatterCache } from "../cache/frontmatter";

export async function getStaticProps() {
  // generate RSS at site build
  await generateRSS(frontMatterCache);

  // const latestFrontMatter= frontMatterCache.slice(0, 4);
  const keywords = getKeysFromFr(frontMatterCache);

  return { props: { keywords } };
}
