import { frontMatter } from "../../cache/frontmatter-cache";
import nextConnect from "next-connect";

export default nextConnect().get(async (req, res) => {
  const results = req.query.q
    ? frontMatter.filter((fr) =>
        fr.title.toLowerCase().includes(req.query.q.toLowerCase())
      )
    : [];
  res.status(200).json({ results });
});
