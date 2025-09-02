import { frontMatterListCache } from "../../cache/frontmatterlist";
import type { NextRequest } from "next/server";

// handles my page search queries, but with edge runtime instead of nodejs. Maybe this is faster.
// titles first then keywords

export const config = {
  runtime: "edge",
};

const resultLimit: number = 5;

// I also add some pages manually just ecause its cool when they appears in the search.
const extra: FrontMatterList = [
  {
    slug: "about",
    title: "About me",
    date: "1991-12-12",
    keywords: ["about"],
    type: "extra",
    summary:
      "My name is Aleksander and I am passionate about sound, software and science. I live in Oslo with my partner and our cat where I drum for various artists and work as an engineer+lecturer for the Musicology Department at the University of Oslo.",
  },
  {
    slug: "publications",
    title: "Publications",
    date: "1991-12-12",
    keywords: [
      "A Universal Tool for Generating Datasets from Audio Effects",
      "DGMD",
      "Hybrid Learning Spaces with Spatial Audio",
      "Towards New Analysis And Visualization Software For Studying Performance Patterns in Hardanger Fiddle Music",
      "Interactive tools for exploring performance patterns in hardanger fiddle music",
    ],
    type: "extra",
    summary:
      "A Universal Tool for Generating Datasets from Audio Effects, DGMD, Hybrid Learning Spaces with Spatial Audio, Towards New Analysis And Visualization Software For Studying Performance Patterns in Hardanger Fiddle Musi, Interactive tools for exploring performance patterns in hardanger fiddle music",
  },
  {
    slug: "posts",
    title: "Posts",
    date: "",
    keywords: ["posts"],
    type: "extra",
    summary: "Check out all my blogposts.",
  },
  {
    slug: "projects",
    title: "Projects",
    date: "",
    keywords: ["projects"],
    type: "extra",
    summary:
      "Check out a selection of my personal projects.",
  },
  {
    slug: "music",
    title: "Music",
    date: "",
    keywords: ["music"],
    type: "extra",
    summary:
      "Listen and read about my past and present musical endeavours.",
  },
];

const FrList: FrontMatterList = frontMatterListCache.concat(extra);

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
    titleHits = FrList.filter((fr) =>
      query_array.every((q) => fr.title.toLowerCase().includes(q.toLowerCase()))
    );

    // if there are more titleHits than the resultLimit, cut it down.
    // The results are ranked by date so this effectively cuts out the older posts.
    if (titleHits.length > resultLimit) {
      titleHits.splice(resultLimit);
    } else {
      // if there is still "more room" for results, search for keyword matches
      // but dont add duplicates (items that are in titleHits already)
      keywordHits = FrList.filter((fr) => {
        if (titleHits.includes(fr)) return false;
        return query_array.every((query) =>
          fr.keywords.some((keywords) =>
            keywords.toLowerCase().includes(query.toLowerCase())
          )
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
