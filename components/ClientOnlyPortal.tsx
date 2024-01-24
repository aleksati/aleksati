import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useIsMounted } from "../hooks/useIsMounted";

type Props = {
  children: React.ReactNode;
  selector: string;
};

const ClientOnlyPortal = ({
  children,
  selector,
}: Props): React.ReactPortal | null => {
  const [isMounted, setIsMounted] = useIsMounted();
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    ref.current = document.querySelector(selector);
  }, [selector, ref]);

  return isMounted ? createPortal(children, ref.current) : null;
};

export default ClientOnlyPortal;
