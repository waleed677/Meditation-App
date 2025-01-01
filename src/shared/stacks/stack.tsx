import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

interface StackProps {
  children: ReactNode;
  flex?: number;
  display?: "flex" | "none";
  flexDirection?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "stretch"
    | "space-between"
    | "space-around";
  alignSelf?:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "baseline";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  px?: number;
  py?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  mx?: number;
  my?: number;
  w?: number;
  h?: number;
  style?: ViewStyle;
}

const Stack: React.FC<StackProps> = ({
  children,
  display = "flex",
  flexDirection = "column",
  justifyContent,
  alignContent,
  alignSelf,
  alignItems,
  gap,
  rowGap,
  columnGap,
  pt,
  pb,
  pl,
  pr,
  px,
  py,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  w,
  h,
  flex,
  style,
}) => {
  const basicsStylesProps: ViewStyle = {
    flex,
    display,
    flexDirection,
    justifyContent,
    alignContent,
    alignSelf,
    alignItems,
    gap,
    rowGap,
    columnGap,
    paddingTop: pt,
    paddingBottom: pb,
    paddingLeft: pl,
    paddingRight: pr,
    paddingHorizontal: px,
    paddingVertical: py,
    marginTop: mt,
    marginBottom: mb,
    marginLeft: ml,
    marginRight: mr,
    marginHorizontal: mx,
    marginVertical: my,
    width: w,
    height: h,
  };

  return <View style={[basicsStylesProps, style]}>{children}</View>;
};

export default Stack;
