import { frontMatterCache } from "../../cache/frontmatter";
import type { NextRequest } from "next/server";

// handles my page search queries, but with edge runtime instead of nodejs. Maybe this is faster.

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query: string = searchParams.get("q");
  let results: object[] = [];

  // if no query, return empty
  if (query.length) {
    // make each search word an item of an array.
    const query_array: string[] = query.split(" ");

    // first, check segments of keywords, if ["search", "query"] is in
    // [["front", "matter"], ["from", "posts"]].
    // if there are multiple search queries, all of them must be represented in the post.
    // this also works for segments, which is cool. For instance, if you search for
    // "no ja", you will get posts with keywords "nodejs javascript", but NOT posts
    // with only "javascript" or "node".
    results = frontMatterCache.filter((fr) =>
      query_array.every((query) =>
        fr.keywords.some((keywords) => keywords.includes(query.toLowerCase()))
      )
    );

    // then segments of titles
    if (!results.length) {
      results = frontMatterCache.filter((fr) =>
        query_array.every((q) =>
          fr.title.toLowerCase().includes(q.toLowerCase())
        )
      );
    }
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
