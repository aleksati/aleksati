import { frontMatterCache } from "../../cache/frontmatter";
import type { NextRequest } from "next/server";

// handles my page search queries, but with edge runtime instead of nodejs. Maybe this is faster.

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  let results = [];

  if (query.length) {
    // make each search word an item of an array.
    const query_array = query.split(" ");

    // first full keywords
    if (!results.length) {
      results = frontMatterCache.filter((fr) =>
        query_array.every((q) => fr.keywords.includes(q.toLowerCase()))
      );
    }

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
        "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
      },
    }
  );
}
