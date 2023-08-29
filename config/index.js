export const dev = process.env.NODE_ENV !== "production";

export const SITE_DOMAIN = dev
  ? "http://localhost:3000"
  : "https://aleksati.net";

// I seem to often change the name of my tabs
// since these tab keys were hardcoded supringly many places (difference between post and work, urls etc.).
export const NAV_TABS = {
  // "identifyer" : "url/key/title"
  about: "about",
  posts: "posts",
  works: "works",
  research: "research",
};

export const KEYWORDS_2_COLOR = {
  audio: "#a3e635", //lime-400
  analysis: "#60a5fa", //blue-400
  motion: "#f87171", //red-400
  video: "#c084fc", // purple-400
  network: "#facc15", //yellow-400
  "5G": "#22d3ee", //cyan-400
  research: "#2dd4bf", // teal-400
  max: "#38bdf8", // sky-400
  performance: "#fb923c", //orange-400
  ableton: "#818cf8", //indigo-400
  opengl: "#a78bfa", //violet-400
  python: "#34d399", //emerald-400
  nmp: "#fb7185", //rose-400
  midi: "#f472b6", //pink-400
  web: "#fbbf24", // amber-400
  javascript: "#a8a29e", // stone-400
  // starting over!
  sonification: "#3f6212", // lime-800
  data: "#1e40af", // blue-800
  telenor: "#991b1b", // red-800
  latency: "#6b21a8", //purple-800
  telematic: "#854d0e", //yellow-800
  music: "#155e75", //cyan-800
  p5js: "#115e59", // teal-800
  lola: "#075985", //sky-800
  osc: "#9a3412", //orange-800
  software: "#3730a3", //indigo-800
  realtime: "#5b21b6", //violet-800
  nodejs: "#065f46", //emerald-800
  dev: "#9f1239", //rose-800
  jitter: "#9d174d", //pink-800
  band: "#86198f", //fuchsia-800
  sculpture: "#92400e", //amber-800
  "avant-garde": "#292524", // stone-800
  // starting over !!
  pop: "#ecfccb", //lime-100
  drums: "#fee2e2", //red-100
  synth: "#f3e8ff", //purple-100
  accordion: "#fef9c3", //yellow-100
  vocals: "#cffafe", //cyan-100
  improvisation: "#ccfbf1", //teal-100
  installation: "#e0f2fe", //sky-100
  guitar: "#ffedd5", //orange-100
  visuals: "#e0e7ff", //indigo-100
  art: "#ede9fe", //violet-100
  rock: "#d1fae5", // emerald-100
  krautrock: "#ffe4e6", //rose-100
  bass: "#fce7f3", //pink-100
  "machine-learning": "#fae8ff", //fuchsia-100
  tech: "#e879f9", // Fuschsia-400
  electronic: "#fef3c7", //amber-100
  "open-source": "#dbeafe", //blue-100
  // "creative-computing": "#115e59", //teal-800
  mapping: "#f5f5f4", // stone-100
};
