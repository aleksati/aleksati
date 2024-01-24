import React, { useEffect, useState } from "react";

export const useIsMounted = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return [isMounted, setIsMounted];
};
