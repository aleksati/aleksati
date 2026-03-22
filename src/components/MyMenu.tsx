// import { useState } from "react";
import ButtonIcon from "./ButtonIcon";
import getCurrTheme from "../functions/getCurrTheme";
// import { useMouseHover } from "../hooks/useMouseHover";
// import { useEffect } from "react";
// import { KEYWORDS_2_COLOR } from "../config";

const COLORS_800 = [
  "#3f6212",
  "#1e40af",
  "#991b1b",
  "#6b21a8",
  "#854d0e",
  "#155e75",
  "#115e59",
  "#075985",
  "#9a3412",
  "#3730a3",
  "#5b21b6",
  "#065f46",
  "#9f1239",
  "#9d174d",
  "#86198f",
  "#92400e",
  "#292524",
];

const MyMenu = ({ onClick, iconId }) => {
  const { currTheme } = getCurrTheme();
  const baseColor: string = currTheme === "dark" ? "white" : "black";
 
    if (iconId === "x") {
    return (
      <ButtonIcon
        iconId="x"
        onClick={onClick}
        iconSize="text-2xl"
        className="-px-0.5"
      />
    );
  }

  return (
    <div id="MyMenu" className="hover:cursor-pointer" onClick={onClick}>
      {iconId === "menu" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 28"
          width="25"
          height="24"
          fill="none"
          stroke={baseColor}
          strokeWidth="3">
          <path d="M4 8 Q8 4, 12 8 T20 8 T28 8" stroke={COLORS_800[Math.floor(Math.random() * COLORS_800.length)]} />
          <path d="M4 16 Q8 12, 12 16 T20 16 T28 16" stroke={COLORS_800[Math.floor(Math.random() * COLORS_800.length)]} />
          <path d="M4 24 Q8 20, 12 24 T20 24 T28 24" stroke={COLORS_800[Math.floor(Math.random() * COLORS_800.length)]} />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 28"
          width="28"
          height="24"
          fill="none"
          stroke={baseColor}
          strokeWidth="3"
          fontSize="8">
          <text x="2" y="9" strokeWidth="1">
            1
          </text>
          <text x="2" y="17" strokeWidth="1">
            2
          </text>
          <text x="2" y="25" strokeWidth="1">
            3
          </text>
          <path d="M10 8 Q14 4, 18 8 T26 8 T34 8" />
          <path d="M10 16 Q14 12, 18 16 T26 16 T34 16" />
          <path d="M10 24 Q14 20, 18 24 T26 24 T34 24" />
        </svg>
      )}
    </div>
  );
};

export default MyMenu;
