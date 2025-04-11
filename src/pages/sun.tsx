import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";

// thesunrightnow

export default function handler() {
  const [currIdx, setCurrIdx] = useState<number>(0);
  const [imgFileNames, setImgFileNames] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  const getImgFileNames = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("./api/sun");
      const data = await res.json();
      console.log(data);
      setImgFileNames(data);
      setIsLoading(false);
      setIsReady(true)
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setIsReady(false);
      console.log(error);
    }
  };

  useEffect(() => {
    // on mount
    //get new filenames from API every 10 minutes
    const interval = setInterval(() => {
      getImgFileNames();
    }, 600000);

    // cleanup on unmount
    return () => clearInterval(interval)
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
      <div>
        <p className="text-xs text-secondary-dark p-2">
          The sun right now. Images sourced from{" "}
          <a className="text-blue-300" href="https://sdo.gsfc.nasa.gov/">
            NASA SDO
          </a>
          . Updates every 5 minutes.
        </p>
      </div>
      {isLoading ? <p className=" px-2 text-xs text-secondary-dark">Loading new images...</p> : <></>}
      <div className="flex flex-grow items-center justify-center">
        {isError ? (
          <p>Obs! Something went wrong</p>
        ) : !isReady ? (
          <></>
        ) : (
          <Image
            src={imgFileNames[currIdx]}
            width="512"
            height="512"
            object-fit="cover"
            alt="Sun Image"
            quality={100}
            priority
          />
        )}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
