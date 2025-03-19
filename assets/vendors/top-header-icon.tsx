import * as React from "react";
import Svg, { Path } from "react-native-svg";
const TopHeaderIcon = ({ fill = "none" }) => (
  <Svg width={25} height={25} viewBox="0 0 20 20" fill="none">
    <Path
      d="M9.99996 18.3332C14.6023 18.3332 18.3333 14.6022 18.3333 9.99984C18.3333 5.39746 14.6023 1.6665 9.99996 1.6665C5.39759 1.6665 1.66663 5.39746 1.66663 9.99984C1.66663 14.6022 5.39759 18.3332 9.99996 18.3332Z"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.275 14.5419C10.125 14.5919 9.86666 14.5919 9.71666 14.5419C8.41666 14.1002 5.5 12.2419 5.5 9.09185C5.5 7.70019 6.61667 6.5752 8 6.5752C8.81667 6.5752 9.54166 6.96685 10 7.58352C10.45 6.97519 11.1833 6.5752 12 6.5752C13.3833 6.5752 14.5 7.70019 14.5 9.09185C14.5 12.2419 11.5833 14.1002 10.275 14.5419Z"
      stroke="black"
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default TopHeaderIcon;
