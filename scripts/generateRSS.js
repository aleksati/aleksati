import { SITE_DOMAIN } from "../config";
import RSS from "rss";
import fs from "fs";

// gets called from pages/index.js
export default async function generateRSS(frontMatter) {
  const feedOptions = {
    title: "aleksati.net / music tech and creative computing",
    description:
      "Part portfolio and part music technology blog. I write about audio programming, networked music, creative computing, software development, and more.",
    site_url: SITE_DOMAIN,
    feed_url: `${SITE_DOMAIN}/rss.xml`,
    image_url: `${SITE_DOMAIN}/img/me.jpg`,
    pubDate: new Date(),
  };

  const feed = new RSS(feedOptions);

  frontMatter.map((fr) => {
    feed.item({
      title: fr.title,
      description: fr.summary,
      url: `${SITE_DOMAIN}/${fr.type}s/${fr.slug}`,
      date: fr.date,
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
  console.log("RSS generated.");
}
