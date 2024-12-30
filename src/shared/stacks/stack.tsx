import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";

interface StackProps {
  children: ReactNode;
  flex?: number;
  display?: "flex" | "none"; // Optional property, could be 'flex' or 'none'
  flexDirection?: "row" | "column"; // Optional property, could be 'row' or 'column'
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"; // Flexbox justifyContent values
  alignContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "stretch"
    | "space-between"
    | "space-around"; // Flexbox alignContent values
  alignSelf?:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "baseline"; // Flexbox alignSelf values
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline"; // Flexbox alignItems values
  gap?: number; // Uniform gap between elements
  rowGap?: number; // Gap between rows (if flexDirection is 'column')
  columnGap?: number; // Gap between columns (if flexDirection is 'row')
  pt?: number; // Padding top
  pb?: number; // Padding bottom
  pl?: number; // Padding left
  pr?: number; // Padding right
  px?: number; // Horizontal padding (left and right)
  py?: number; // Vertical padding (top and bottom)
  mt?: number; // Margin top
  mb?: number; // Margin bottom
  ml?: number; // Margin left
  mr?: number; // Margin right
  mx?: number; // Horizontal margin (left and right)
  my?: number; // Vertical margin (top and bottom)
  w?: number; // Width
  h?: number; // Height
  style?: ViewStyle; // Height
}

const Stack: React.FC<StackProps> = ({
  children,
  display = "flex", // Default value for display is "flex"
  flexDirection = "column", // Default to "column" for flexDirection
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
  // Define style props using the provided props
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
