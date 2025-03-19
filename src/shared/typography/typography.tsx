import React from "react";
import { Text, TextStyle, StyleSheet } from "react-native";

interface TypographyProps {
  children: React.ReactNode;
  type:
    | "title"
    | "title2"
    | "subtitle1"
    | "subtitle2"
    | "subtitle3"
    | "paragraph1"
    | "paragraph1Bold"
    | "none"
    | "button"
    | "paragraph2"
    | "paragraph2bold"
    | "paragraph2Light"
    | "caption"
    | "inputLabel";

  style?: TextStyle;
}

const Typography: React.FC<TypographyProps> = ({ children, type, style }) => {
  const getTextStyle = (type: string) => {
    switch (type) {
      case "title":
        return styles.title;
      case "title2":
        return styles.title2;
      case "subtitle1":
        return styles.subtitle1;
      case "subtitle2":
        return styles.subtitle2;
      case "subtitle3":
        return styles.subtitle3;
      case "paragraph1":
        return styles.paragraph1;
      case "paragraph1Bold":
        return styles.paragraph1Bold;
      case "button":
        return styles.button;
      case "paragraph2":
        return styles.paragraph2;
      case "paragraph2bold":
        return styles.paragraph2bold;
      case "paragraph2Light":
        return styles.paragraph2Light;
      case "caption":
        return styles.caption;
      case "inputLabel":
        return styles.inputLabel;
      default:
        return styles.paragraph1;
    }
  };

  return (
    <Text allowFontScaling={false} style={[getTextStyle(type), style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    lineHeight: 40,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold",
  },
  subtitle1: {
    fontSize: 22,
    lineHeight: 42,
    fontWeight: "normal",
  },
  subtitle2: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "normal",
  },
  subtitle3: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "medium",
  },
  paragraph1: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "normal",
  },
  paragraph1Bold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
  },
  button: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
  },
  paragraph2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "normal",
  },
  paragraph2bold: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
  },
  paragraph2Light: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "300",
  },
  caption: {
    fontSize: 12,
    // lineHeight: 16,
    fontWeight: "normal",
  },
  inputLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "normal",
  },
});

export default Typography;
