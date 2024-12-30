import * as React from "react";
import Svg, { Ellipse, Path } from "react-native-svg";
const PlayVideoButton = () => (
  <Svg width={52} height={51} viewBox="0 0 52 51" fill="none">
    <Ellipse cx={26.0002} cy={25.9131} rx={25.6135} ry={25} fill="#FF913C" />
    <Path
      d="M18.3867 25.913V22.353C18.3867 17.933 21.5167 16.123 25.3467 18.333L28.4367 20.113L31.5267 21.893C35.3567 24.103 35.3567 27.723 31.5267 29.933L28.4367 31.713L25.3467 33.493C21.5167 35.703 18.3867 33.893 18.3867 29.473V25.913Z"
      stroke="#FFF9F0"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default PlayVideoButton;
