import { useRef, useEffect, useState, useCallback } from "react";
import getClockValue from "../functions/getClockValue";
import getCurrTheme from "../functions/getCurrTheme";
import ButtonIcon from "./ButtonIcon";

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

  // const [stateTheme, setStateTheme] = useState(null);
  const { currTheme } = getCurrTheme();

  const audio = `/audio/${src}`;

  const create = async () => {
    try {
      const WaveSurfer = (await import("wavesurfer.js")).default;
      const options = WaveFormOptions(containerRef.current, newOptions);
      waveFormRef.current = WaveSurfer.create(options);
      waveFormRef.current.load(audio);

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

  // change the color of the waveform based on the current theme
  const setAudioColor = useCallback(() => {
    if (audioIsMounted) {
      waveFormRef.current.setProgressColor(
        currTheme === "light" ? "#000" : "#fff"
      );
      waveFormRef.current.setWaveColor(currTheme === "light" ? "#000" : "#fff");
      waveFormRef.current.setCursorColor(
        currTheme === "light" ? "#000" : "#fff"
      );
    }
  }, [waveFormRef, audioIsMounted, currTheme]);

  useEffect(() => {
    setAudioColor();
  }, [setAudioColor]);

  // update play state when pause/play
  const handlePlayPause = () => {
    setIsPlaying((prevstate) => !prevstate);
    waveFormRef.current.playPause();
  };

  return (
    <div className="flex items-center justify-start py-4 py-6">
      {audioIsMounted ? (
        <div className="flex items-center">
          <ButtonIcon
            onClick={handlePlayPause}
            iconId={isPlaying ? "pause" : "play"}
            className="cursor-pointer"
          />
          <p id="audiotime">00:00</p>
        </div>
      ) : (
        <p className="w-2/3">Loading audio...</p>
      )}
      <div className="relative w-full">
        <div className="px-2" id="waveform" ref={containerRef} />
      </div>
    </div>
  );
};

export default MyAudioPlayer;
