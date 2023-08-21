export const dev = process.env.NODE_ENV !== "production";

export const SITE_DOMAIN = dev
  ? "http://localhost:3000"
  : "https://aleksati.net";

// I seem to often change the name of my tabs
// since these tab keys were hardcoded supringly many places (difference between post and work, urls etc.),
// I wanted to have a single source of truth.
export const navTabs = {
  about: "about",
  posts: "posts",
  works: "works",
  research: "research",
};
