import { useEffect, useState } from "react";
import Image from "next/image";

// Show slideshow of realtime NASA images of the sun. The images are fetched from the NASA SDO database (../pages/api/sun.api), and updated every 5 minutes.
const TheSunRightNow = () => {
  const [currIdx, setCurrIdx] = useState<number>(0);
  const [imgFileNames, setImgFileNames] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  const getImgFileNames = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("./api/thesunrightnow");
      const data = await res.json();
      console.log(data);
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
    <div className="flex flex-col min-h-screen bg-black">
      <div className="text-xs text-secondary-dark p-2">
        <p>
          The sun right now. Images sourced from{" "}
          <a className="text-blue-500" href="https://sdo.gsfc.nasa.gov/">
            NASA SDO
          </a>
          . Updates every 5 minutes.
        </p>
      </div>
      {isLoading ? (
        <p className=" px-2 text-xs text-secondary-dark">
          Loading new images...
        </p>
      ) : (
        <></>
      )}
      <div className="flex flex-grow items-center justify-center">
        {isError ? (
          <p>Obs! Something went wrong</p>
        ) : !isReady ? (
          <></>
        ) : (
          <Image
            src={imgFileNames[currIdx]}
            width="920"
            height="920"
            object-fit="cover"
            alt="Sun Image"
            quality={100}
            priority
            // fill
            // className={`relative object-contain object-center`}
          />
        )}
      </div>
    </div>
  );
};

export default TheSunRightNow;
