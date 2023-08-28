import { SITE_DOMAIN } from "../config";
import RSS from "rss";
import fs from "fs";

// gets called from pages/index.js
export default async function generateRSS(frontMatter) {
  const feedOptions = {
    title: "aleksati.net/rss.xml - music tech posts & works",
    description:
      "Engineer and University lecturer, specializing in networked music and audio programming.",
    site_url: SITE_DOMAIN,
    feed_url: `${SITE_DOMAIN}/rss.xml`,
    // image_url: `${SITE_DOMAIN}/logo.png`,
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
