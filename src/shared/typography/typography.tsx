import React from "react";
import { Text, TextStyle, StyleSheet } from "react-native";

// Define a prop type with a `type` field for predefined styles
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
    | "button"
    | "paragraph2"
    | "paragraph2bold"
    | "paragraph2Light"
    | "caption"
    | "inputLabel";
  style?: TextStyle; // Additional custom styles
}

const Typography: React.FC<TypographyProps> = ({ children, type, style }) => {
  // Define the default styles based on the type
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
        return styles.paragraph1; // Default to paragraph1 style
    }
  };

  return <Text style={[getTextStyle(type), style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    lineHeight: 40,
    fontWeight: "bold", // Title should be bold
  },
  title2: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold", // Title should be bold
  },
  subtitle1: {
    fontSize: 22,
    lineHeight: 42,
    fontWeight: "normal", // Subtitle 1, normal weight
  },
  subtitle2: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "normal", // Subtitle 2, normal weight
  },
  subtitle3: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "medium", // Subtitle 2, normal weight
  },
  paragraph1: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "normal", // Regular paragraph
  },
  paragraph1Bold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold", // Bold paragraph
  },
  button: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold", // Button text should be bold
  },
  paragraph2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "normal", // Small paragraph
  },
  paragraph2bold: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold", // Small paragraph
  },
  paragraph2Light: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "300", // Lighter weight for small text
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "normal", // Caption style
  },
  inputLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "normal", // Input label style
  },
});

export default Typography;
