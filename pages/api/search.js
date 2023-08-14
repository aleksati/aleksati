import { initValidation, get, query } from "../../middleware/middlewareApi";
import { frontMatterCache } from "../../cache/frontmatter";
import nextConnect from "next-connect";

// maybe send a "mounted" or "get-ready" request to initalize the API route.
// I can send it when a users highlights the search. so on Focus.
// but first, try this:
// https://nextjs.org/docs/pages/building-your-application/routing/api-routes#edge-api-routes

// handles my page search function.

const searchValidation = initValidation([
  query("q").exists().withMessage("search request must include query (q)."),
]);

export default nextConnect()
  .use(get(searchValidation))
  .get(async (req, res) => {
    const query = req.query.q;
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

      // then summary
      // if (!results.length) {
      //   results = frontMatterCache.filter((fr) =>
      //     fr.summary.toLowerCase().includes(query.toLowerCase())
      //   );
      // }
    }

    res.status(200).json({ results });
  });
