import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  ActivityIndicator,
} from "react-native";

interface IconButtonProps {
  text?: string;
  onPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  backgroundColor?: string;
  padding?: number;
  borderRadius?: number;
  textColor?: string;
  fontSize?: number;
  lineHeight?: number;
  h?: number;
  fontWeight?: TextStyle["fontWeight"];
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  isLoading?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  text = "",
  onPress = () => console.log("Button pressed"),
  style,
  titleStyle,
  backgroundColor = "#000",
  padding,
  borderRadius = 24,
  textColor = "#fff",
  fontSize = 16,
  fontWeight = "bold",
  lineHeight = 24,
  h = 38,
  rightIcon,
  leftIcon,
  isLoading,
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
      disabled={isLoading}
      style={[styles.button, buttonStyle, style]}
    >
      {leftIcon && <View style={{ marginBottom: 2 }}>{leftIcon}</View>}
      <Text style={[styles.title, buttonTitleStyle, titleStyle]}>
        {text} {isLoading && <ActivityIndicator color="#fff" />}
      </Text>
      {rightIcon && <View>{rightIcon} </View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
});

export default IconButton;
