import { date2text } from "../functions/date2text";
import useWindowSize from "../hooks/useWindowSize";

const keyword2color = {
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
  javascript: "#a8a29e", // stone-4004
  // starting over!
  sonification: "#3f6212", // lime-800
  data: "#1e40af", // blue-800
  telenor: "#991b1b", // red-800
  latency: "#6b21a8", //purple-800
  telematic: "#854d0e", //yellow-800
  music: "#155e75", //cyan-800
  lola: "#075985", //sky-800
  osc: "#9a3412", //orange-800
  software: "#3730a3", //indigo-800
  realtime: "#5b21b6", //violet-800
  nodejs: "#065f46", //emerald-800
  jitter: "#9d174d", //pink-800
  band: "#86198f", //fuchsia-800
  "avant-garde": "#292524",
  // starting over !!
  pop: "#ecfccb", //lime-100
  drums: "#fee2e2", //red-100
  synth: "#f3e8ff", //purple-100
  accordion: "#fef9c3", //yellow-100
  vocals: "#cffafe", //cyan-100
  improvisation: "#ccfbf1", //teal-100
  guitar: "#ffedd5", //orange-100
  visuals: "#e0e7ff", //indigo-100
  art: "#ede9fe", //violet-100
  rock: "#d1fae5", // emerald-100
  krautrock: "#ffe4e6", //rose-100
  bass: "#fce7f3", //pink-100
  electronic: "#fef3c7", //amber-100
  "machine-learning": "#fae8ff", //fuchsia-100
  "open-source": "#dbeafe", //blue-100
  installation: "#e0f2fe", //sky-100
  sculpture: "#92400e", //amber-800
  tech: "#e879f9", // Fuschsia-400
  computing: "#115e59", //teal-800
  dev: "#9f1239", //rose-800
};

// https://tailwindcss.com/docs/customizing-colors

const widthTresh = 768; // tailwind md = 768;

const DateAndKeywordViewer = ({ keywords = [], date, type }) => {
  const { width } = useWindowSize();

  // On mobile view, we show less keywords.
  const maxKeywords = width < widthTresh ? 4 : 5;

  return (
    <div className="flex flex-wrap text-sm text-secondary dark:text-secondary-dark space-x-2 items-center">
      <p>{date2text(date, type)}</p>
      {keywords.map(
        (keyword, idx) =>
          idx < maxKeywords && (
            <div className="flex space-x-1 items-center" key={keyword}>
              <p
                className="text-lg"
                style={{ color: `${keyword2color[keyword]}` }}
              >
                •
              </p>
              <p>{keyword}</p>
            </div>
          )
      )}
      {keywords.length && keywords.length > maxKeywords && <p>...</p>}
    </div>
  );
};

export default DateAndKeywordViewer;
