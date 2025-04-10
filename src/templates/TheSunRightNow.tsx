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
      <div className="grid grid-cols-1 pt-2 gap-4 lg:gap-0 lg:grid-cols-4">
        {/* <div className="min-h-screen container pb-6 mx-auto flex-1"> */}
        <div className="text-xs col-span-1 text-secondary-dark px-2">
          <p>The Sun Right Now</p>
          <p>
            Images from{" "}
            <a className="text-blue-500" href="https://sdo.gsfc.nasa.gov/">
              NASA SDO
            </a>
            , updated every 5 minutes.
          </p>
          {isLoading ? <p>Loading latest images...</p> : <></>}
        </div>
        <div className="flex col-span-1 lg:col-span-3 items-start justify-start">
          {isError ? (
            <p>Obs! Something went wrong</p>
          ) : !isReady ? (
            <></>
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
        {/* <div className="bg-red-400 col-span-1">
      </div> */}
      </div>
    </div>
  );
};

export default TheSunRightNow;
