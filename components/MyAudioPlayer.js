import getClockValue from "../functions/getClockValue";
import { useRef, useEffect, useState } from "react";
import Icon from "./Icon";

const WaveFormOptions = (ref, opt) => ({
  container: ref,
  // waveColor: "rgb(0,0,0)", // "#211F24",
  // progressColor: "rgb(0,0,0)", // "#300415",
  // cursorColor: "rgb(20,0,0)", // "#300415",
  cursorWidth: 2,
  //   barWidth: 1,
  //   barRadius: 5,
  responsive: true,
  height: 80,
  partialRender: false, //true
  hideScrollbar: true,
  // normalize: true,
  splitChannels: false,
  ...opt,
});

const MyAudioPlayer = ({ src, newOptions = {} }) => {
  const containerRef = useRef(null);
  const waveFormRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioIsMounted, setAudioIsMounted] = useState(false);
  //   const [stateTheme, setStateTheme] = useState(null);
  //   const { currTheme } = getCurrTheme();

  const create = async () => {
    try {
      const WaveSurfer = (await import("wavesurfer.js")).default;
      const options = WaveFormOptions(containerRef.current, newOptions);
      waveFormRef.current = WaveSurfer.create(options);
      waveFormRef.current.load(src);

      waveFormRef.current.on("audioprocess", () => {
        let currTime = waveFormRef.current.getCurrentTime();
        currTime = getClockValue(currTime);
        document.getElementById("audiotime").innerText = currTime;
      });

      waveFormRef.current.on("ready", () => setAudioIsMounted(true));
    } catch (error) {
      console.log(error);
    }
  };

  // on mount, create the wavesurfer
  useEffect(() => {
    create();

    return () => {
      if (waveFormRef.current) {
        waveFormRef.current.destroy();
        setAudioIsMounted(false);
      }
    };
  }, []);

  const handlePlayPause = () => {
    setIsPlaying((prevstate) => !prevstate);
    waveFormRef.current.playPause();
  };

  return (
    <div className="flex items-center justify-start p-2 py-6">
      {audioIsMounted ? (
        <div className="flex items-center">
          <div onClick={handlePlayPause} className="cursor-pointer">
            <Icon id={isPlaying ? "pause" : "play"} />
          </div>
          <div className="w-8 ml-2 mr-4">
            <p id="audiotime">00:00</p>
          </div>
        </div>
      ) : (
        <p className="w-1/2">Loading audio...</p>
      )}
      <div className="relative w-full">
        <div id="waveform" ref={containerRef} />
      </div>
    </div>
  );
};

export default MyAudioPlayer;
