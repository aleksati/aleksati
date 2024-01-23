import { Button } from "../components/Button";
import React, { useRef } from "react";

// wow
type OneOrMany<Type> = Type | Type[];
const flaton: OneOrMany<string> = ["hey", "two", "three"];

export const Testing = () => {
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
  };

  return (
    <div>
      <Button
        ref={ref}
        type="button"
        onClick={handleClick}
        onKeyDown={() => console.log("keyDown")}>
        Hey there
      </Button>
    </div>
  );
};

export default Testing;
