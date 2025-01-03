import React from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import PlayVideoButton from "../../../assets/vendors/play-video-button";
import Typography from "../typography/typography";
import Stack from "../stacks/stack";
import AudioIcon from "../../../assets/vendors/audio-icon";
const width = Dimensions.get("window").width;
const VideoCard = ({ source }: { source: number }) => {
  return (
    <View style={style.container}>
      <View style={style.card_img_wrapper}>
        <ImageBackground style={style.card_bg} source={source} alt="bg-image">
          <View style={style.box_layer}>
            <PlayVideoButton />
          </View>
        </ImageBackground>
      </View>
      <Stack gap={2}>
        <Typography type="caption" style={{ color: "#2762A6" }}>
          GUIDED MINDFULNESS
        </Typography>
        <Typography type="subtitle3" style={{ color: "#2762A6" }}>
          Deep Sleep Exercise
        </Typography>
      </Stack>
      <Stack mt={5} flexDirection="row" gap={4}>
        <AudioIcon />
        <Typography type="caption" style={{ color: "#FF6A00" }}>
          11:14
        </Typography>
      </Stack>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: width - 30,
    marginBottom: 15,
  },
  card_img_wrapper: {
    width: width - 32,
    height: 215,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 8,
  },
  card_bg: {
    width: width - 32,
    height: 215,
    resizeMode: "cover",
  },
  box_layer: {
    backgroundColor: "#00000020",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 215,
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default VideoCard;
