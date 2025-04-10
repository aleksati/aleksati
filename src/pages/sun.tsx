import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";

// the-sun-rn
// with spinner

export default function handler() {
  const [currIdx, setCurrIdx] = useState<number>(0);
  const [imgFileNames, setImgFileNames] = useState<string[]>([""]);

  const getImgFileNames = async () => {
    try {
      // loading (showLoading) show loading
      const res = await fetch("./api/sun");
      const data = await res.json();
      console.log(data)
      setImgFileNames(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // on mount
    getImgFileNames();

    // get new filenames from API every 10 minutes
    // const interval = setInterval(() => {
    //   getNewImgFileNames();
    // }, 600000);

    // return () => clearInterval(interval)
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
      <div className="flex flex-grow items-center justify-center">
        <Image
          src={imgFileNames[currIdx]}
          width="512"
          height="512"
          object-fit="cover"
          alt="Sun Image"
        />
      </div>
        <div>
          <p className="text-xs text-center">
            The sun right now. Images from <a className="text-blue-300" href="https://sdo.gsfc.nasa.gov/">NASA SDO</a>. Updates every 5
            minutes.
          </p>
        </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
