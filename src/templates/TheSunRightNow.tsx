import { useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import Image from "next/image";

// Show slideshow of realtime NASA images of the sun. The images are fetched from the NASA SDO database (../pages/api/sun.api), and updated every 5 minutes.
const TheSunRightNow = () => {
  const [currIdx, setCurrIdx] = useState<number>(0);
  const [imgFileNames, setImgFileNames] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const windowSize = useWindowSize();

  const getImgFileNames = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("./api/thesunrightnow");
      const data = await res.json();
      // console.log(data);
      setImgFileNames(data);
      setIsLoading(false);
      setIsReady(true);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setIsReady(false);
      console.log(error);
    }
  };

  useEffect(() => {
    // on mount
    getImgFileNames();

    console.log("----")
    console.log("The Sun Right Now. Images from NASA SDO satellite observatory. Slideshow updates every 5 minutes.")

    //get new filenames from API every 5 minutes
    const interval = setInterval(() => {
      getImgFileNames();
    }, 300000);

    // cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Rotate sunimage every 10 seconds
    const interval = setInterval(() => {
      setCurrIdx((prevIndex) => (prevIndex + 1) % imgFileNames.length);
    }, 10000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [imgFileNames.length]);

  return (
    <div className="min-h-screen bg-black">
        <div className="flex items-center justify-center">
          {isError ? (
            <p>Obs! Something went wrong</p>
          ) : !isReady ? (
            <p className="text-secondary text-xs">Fetching first images...</p>
          ) : (
            <Image
              src={imgFileNames[currIdx]}
              width={windowSize.height || 720}
              height={windowSize.height || 720}
              object-fit="cover"
              alt="Sun Image"
              quality={100}
              priority
            />
          )}
        </div>
      </div>
  );
};

export default TheSunRightNow;
