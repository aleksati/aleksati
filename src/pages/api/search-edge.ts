import { frontMatterListCache } from "../../cache/frontmatterlist";
import type { NextRequest } from "next/server";

// handles my page search queries, but with edge runtime instead of nodejs. Maybe this is faster.
// titles first then keywords

const resultLimit: number = 5;

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query: string = searchParams.get("q");
  let titleHits: FrontMatterList = [];
  let keywordHits: FrontMatterList = [];
  let results: FrontMatterList;

  // if no query, return empty
  if (query.length) {
    // make each search word an item of an array.
    const query_array: string[] = query.split(" ");

    // My algorithm checks for segments of title and keywords in the search query.
    // So, if ["search", "query"] is in "titles" or ["key", "words", "from", "posts"].

    // If there are multiple search query words, all of them must be represented in the item for
    // it to be a results. This also works for segments also, for instance, if you search for
    // "no ja", you will get posts with titles and keywords that match "nodejs javascript", but NOT posts
    // with only "javascript" or "node".

    // start with titles
    titleHits = frontMatterListCache.filter((fr) =>
      query_array.every((q) => fr.title.toLowerCase().includes(q.toLowerCase()))
    );

    // if there are more titleHits than the resultLimit, cut it down.
    // The results are ranked by date so this effectively cuts out the older posts.
    if (titleHits.length > resultLimit) {
      titleHits.splice(resultLimit);
    } else {
      // if there is still "more room" for results, search for keyword matches
      // but dont add duplicates (items that are in titleHits already)
      keywordHits = frontMatterListCache.filter((fr) => {
        if (titleHits.includes(fr)) return false;
        return query_array.every((query) =>
          fr.keywords.some((keywords) => keywords.includes(query.toLowerCase()))
        );
      });

      // if there are too many titles + keywords matches, remove some keyword matches
      if (keywordHits.length + titleHits.length > resultLimit) {
        keywordHits.splice(resultLimit - titleHits.length);
      }
    }

    // combine search results
    results = titleHits.concat(keywordHits);
  }

  return new Response(
    JSON.stringify({
      results,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
