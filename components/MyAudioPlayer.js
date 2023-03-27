import getClockValue from "../functions/getClockValue";
import { useRef, useEffect, useState } from "react";
import Icon from "./Icon";

const WaveFormOptions = (ref, opt) => ({
  container: ref,
  //   waveColor: "rgb(33, 31, 36)", // "#211F24",
  //   progressColor: "rgb(239, 68, 68)", // "#300415",
  //   cursorColor: "rgb(239, 68, 68)", // "#300415",
  //   cursorWidth: 3,
  //   barWidth: 1,
  //   barRadius: 5,
  responsive: true,
  height: 60,
  partialRender: false, //true
  hideScrollbar: true,
  normalize: true,
  splitChannels: true,
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
    <div className="flex items-center justify-start p-2">
      {audioIsMounted ? (
        <div className="flex items-center">
          <div onClick={handlePlayPause} className="cursor-pointer">
            <Icon id={isPlaying ? "pause" : "play"} iconSize={"text-md"} />
          </div>
          <div className="w-8 ml-2 mr-4 text-sm">
            <p id="audiotime">00:00</p>
          </div>
        </div>
      ) : (
        <div className="flex text-sm items-center space-x-2">
          <p>Loading audio...</p>
        </div>
      )}
      <div className="relative w-full">
        <div id="waveform" ref={containerRef} />
      </div>
    </div>
  );
};

export default MyAudioPlayer;
