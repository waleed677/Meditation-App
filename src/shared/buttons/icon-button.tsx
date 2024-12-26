import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";

// Define the types for the props
interface IconButtonProps {
  text?: string; // Button text
  onPress?: () => void; // Optional onPress handler
  style?: ViewStyle; // Style for the button container (TouchableOpacity)
  titleStyle?: TextStyle; // Style for the text (Button title)
  backgroundColor?: string; // Custom background color for the button
  padding?: number; // Custom padding for the button
  borderRadius?: number; // Custom border radius
  textColor?: string; // Custom text color for the button's title
  fontSize?: number; // Custom font size for the button's title
  lineHeight?: number; // Custom lineHeight
  h?: number; // Custom height
  fontWeight?: TextStyle["fontWeight"]; // Custom font weight for the button's title
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  text = "",
  onPress = () => console.log("Button pressed"),
  style,
  titleStyle,
  backgroundColor = "#000", // Default background color
  padding, // Default padding
  borderRadius = 24, // Default border radius
  textColor = "#fff", // Default text color
  fontSize = 16, // Default font size
  fontWeight = "bold", // Default font weight
  lineHeight = 24,
  h = 38,
  rightIcon,
  leftIcon,
}) => {
  // Style for the button container
  const buttonStyle: ViewStyle = {
    backgroundColor,
    padding,
    borderRadius,
    height: h,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexDirection: "row",
  };

  // Style for the button's text
  const buttonTitleStyle: TextStyle = {
    color: textColor,
    fontSize,
    fontWeight,
    lineHeight,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle, style]} // Apply container styles
    >
      {leftIcon && <View style={{ marginBottom: 2 }}>{leftIcon}</View>}
      <Text style={[styles.title, buttonTitleStyle, titleStyle]}>{text}</Text>
      {rightIcon && <View>{rightIcon}</View>}
      {/* Apply title styles */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center", // Center text vertically
  },
  title: {
    textAlign: "center", // Center the text
  },
});

export default IconButton;
