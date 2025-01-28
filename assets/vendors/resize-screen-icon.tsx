import React from "react";
import Svg, { Path } from "react-native-svg";

const ResizeScreenIcon = () => {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Path
        d="M12.25 5.25V1.75H8.75"
        stroke="#FFF9F0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.75 8.75V12.25H5.25"
        stroke="#FFF9F0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.25 1.75L7.875 6.125"
        stroke="#FFF9F0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.125 7.875L1.75 12.25"
        stroke="#FFF9F0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ResizeScreenIcon;
