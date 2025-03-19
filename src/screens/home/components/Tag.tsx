import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

const Tag = ({
  text,
  tagStyle,
  tagTextStyle,
}: {
  text: string;
  tagStyle?: ViewStyle;
  tagTextStyle?: TextStyle;
}) => {
  return (
    <View style={[style.tag, tagStyle]}>
      <Text allowFontScaling={false} style={[style.tag_text, tagTextStyle]}>
        {text}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  tag: {
    borderWidth: 1,
    borderColor: "#6699FF",
    borderRadius: 4,
    padding: 5,
    height: 22,
    marginRight: 4,
  },
  tag_text: {
    fontSize: 10,
    lineHeight: 12,
    color: "#6699FF",
  },
});

export default Tag;
