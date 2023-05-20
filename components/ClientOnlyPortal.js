import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useIsMounted } from "../hooks/useIsMounted";

const ClientOnlyPortal = ({ children, selector }) => {
  const [isMounted, setIsMounted] = useIsMounted();
  const ref = useRef();

  useEffect(() => {
    ref.current = document.querySelector(selector);
  }, [selector, ref]);

  return isMounted ? createPortal(children, ref.current) : null;
};

export default ClientOnlyPortal;
