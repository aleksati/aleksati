import { useRef, useEffect, useState, useCallback, memo } from "react";
import { useIsMounted } from "../hooks/useIsMounted";
import getClockValue from "../functions/getClockValue";
import getCurrTheme from "../functions/getCurrTheme";
import ButtonIcon from "./ButtonIcon";

const WaveFormOptions = (ref, opt) => ({
  container: ref,
  // waveColor: "rgb(0,0,0)", // "#211F24",
  // progressColor: "rgb(0,0,0)", // "#300415",
  // cursorColor: "rgb(20,0,0)", // "#300415",
  //   barWidth: 1,
  //   barRadius: 5,
  // normalize: true,
  cursorWidth: 2,
  responsive: true,
  height: 80,
  partialRender: false, //true
  hideScrollbar: true,
  splitChannels: false,
  ...opt,
});

const MyAudioPlayer = ({ src, newOptions = {} }) => {
  const containerRef = useRef();
  const waveFormRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveFormIsMounted, setWaveFormIsMounted] = useState(false);

  // const [stateTheme, setStateTheme] = useState(null);
  // const audio = `/audio/${src}`;
  // const { currTheme } = getCurrTheme();

  //  create the wavesurfer audioplayer
  const createAudioPlayer = useCallback(async () => {
    try {
      const WaveSurfer = (await import("wavesurfer.js")).default;
      const options = WaveFormOptions(containerRef.current, newOptions);
      waveFormRef.current = WaveSurfer.create(options);
      waveFormRef.current.load(`/audio/${src}`);

      // set the timer to countdown when the audio is running
      waveFormRef.current.on("audioprocess", () => {
        let currTime = waveFormRef.current.getCurrentTime();
        let currClockTime = getClockValue(currTime);
        document.getElementById("audiotime").innerText = currClockTime;
      });

      waveFormRef.current.on("ready", () => setWaveFormIsMounted(true));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // on mount
  useEffect(() => {
    createAudioPlayer();

    return () => {
      if (waveFormRef.current) {
        waveFormRef.current.destroy();
        setWaveFormIsMounted(false);
      }
    };
  }, [createAudioPlayer, waveFormRef]);

  // useEffect(() => {
  //   // change the color of the waveform based on the current theme
  //   const setAudioColor = () => {
  //     if (!waveFormIsMounted || !waveFormRef.current) return;
  //     let color = currTheme === "light" ? "#000" : "#fff";
  //     waveFormRef.current?.setProgressColor(color);
  //     waveFormRef.current?.setWaveColor(color);
  //     waveFormRef.current?.setCursorColor(color);
  //   };

  //   setAudioColor();
  // }, [waveFormRef, waveFormIsMounted, currTheme]);

  // update play state when pause/play
  const handlePlayPause = () => {
    setIsPlaying((prevstate) => !prevstate);
    waveFormRef.current.playPause();
  };

  return (
    <div className="flex items-center justify-start py-4 py-6">
      {waveFormIsMounted ? (
        <div className="flex items-center space-x-2">
          <ButtonIcon
            onClick={handlePlayPause}
            iconId={isPlaying ? "pause" : "play"}
            className="cursor-pointer"
            iconSize="text-lg"
          />
          <p id="audiotime" className="text-sm">
            00:00
          </p>
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

export default memo(MyAudioPlayer);
