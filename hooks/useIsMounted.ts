import { useEffect, useState } from "react";

export const useIsMounted = (): [Boolean, Function] => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return [isMounted, setIsMounted];
};
