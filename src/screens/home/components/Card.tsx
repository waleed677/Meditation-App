import React, { useMemo } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Typography from "../../../shared/typography/typography";

interface CardProps {
  imageLink: number;
  text: string;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  imageLink,
  text,
  onPress = () => console.log("press"),
}) => {
  const width = useMemo(() => Dimensions.get("window").width / 2 - 20, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground source={imageLink} style={[styles.card, { width }]}>
        <Typography type="paragraph1Bold" style={styles.text}>
          {text}
        </Typography>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 150,
    borderRadius: 20,
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "row",
    padding: 14,
  },
  text: {
    color: "#fff",
  },
});

export default Card;
