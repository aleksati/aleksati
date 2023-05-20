import { date2text } from "../functions/date2text";

const keyword2color = {
  audio: "#a3e635", //lime-400
  analysis: "#60a5fa", //blue-400
  motion: "#f87171", //red-400
  video: "#c084fc", // purple-400
  network: "#facc15", //yellow-400
  "5G": "#22d3ee", //cyan-400
  research: "#2dd4bf", // teal-400
  max: "#38bdf8", // sky-400
  live: "#fb923c", //orange-400
  ableton: "#818cf8", //indigo-400
  opengl: "#a78bfa", //violet-400
  python: "#34d399", //emerald-400
  nmp: "#fb7185", //rose-400
  midi: "#f472b6", //pink-400
  web: "#fbbf24", // amber-400
  p5js: "#e879f9", // Fuschsia-400
  javascript: "#a8a29e", // stone-4004
  // starting over!
  sonification: "#3f6212", // lime-800
  data: "#1e40af", // blue-800
  telenor: "#991b1b", // red-800
  latency: "#6b21a8", //purple-800
  telematic: "#854d0e", //yellow-800
  music: "#155e75", //cyan-800
  "music-tech": "#115e59", //teal-800
  lola: "#075985", //sky-800
  "python-osc": "#9a3412", //orange-800
  "software-dev": "#3730a3", //indigo-800
  "real-time": "#5b21b6", //violet-800
  nodejs: "#065f46", //emerald-800
  "creative-computing": "#9f1239", //rose-800
  jitter: "#9d174d", //pink-800
  rtmidi: "#92400e", //amber-800
};

// https://tailwindcss.com/docs/customizing-colors

export const keyword2text = {
  audio: "audio",
  motion: "motion",
  analysis: "analysis",
  video: "video",
  network: "network",
  "5G": "5G",
  jacktrip: "jacktrip",
  research: "research",
  max: "max",
  live: "live",
  opengl: "opengl",
  ableton: "ableton",
  python: "python",
  nmp: "nmp",
  midi: "midi",
  web: "web",
  p5js: "p5js",
  javascript: "javascript",
  sonification: "sonification",
  data: "data",
  telenor: "telenor",
  latency: "latency",
  telematic: "telematic",
  music: "music",
  "music tech": "music tech",
  lola: "lola",
  osc: "osc",
  "software dev": "software dev",
  realtime: "realtime",
  nodejs: "nodejs",
  "creative computing": "creative computing",
  jitter: "jitter",
  rtmidi: "rtmidi",
};

const maxKeywords = 4;

const DateAndKeywordViewer = ({ keywords = [], date }) => {
  return (
    <div className="flex flex-wrap text-sm text-secondary dark:text-secondary-dark space-x-2 items-center">
      <p>{date2text(date)}</p>
      {keywords.map(
        (keyword, idx) =>
          idx < maxKeywords && (
            <div className="flex space-x-1 items-center" key={keyword}>
              <p
                className="text-lg"
                style={{ color: `${keyword2color[keyword]}` }}>
                •
              </p>
              <p>{keyword2text[keyword]}</p>
            </div>
          )
      )}
      {keywords.length && keywords.length > maxKeywords && <p>...</p>}
    </div>
  );
};

export default DateAndKeywordViewer;
