import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import PlayVideoButton from "../../../assets/vendors/play-video-button";
import PauseButton from "../../../assets/vendors/pause-button-icon";
import RepeatingIcon from "../../../assets/vendors/repeatinf-icon";
import CrossIcon from "../../../assets/vendors/cross-icon";
import ResizeScreenIcon from "../../../assets/vendors/resize-screen-icon";
import { useNavigation } from "@react-navigation/native";
const VideoControls = ({
  onTogglePlayPause,
  onSeek,
  onToggleFullscreen,
  duration,
  currentTime: time,
  shouldPlay,
  loopValue,
  setIsLooping,
}) => {
  const navigator = useNavigation();
  const formatTime = (timeInMillis) => {
    if (!isNaN(timeInMillis)) {
      const totalSeconds = Math.floor(timeInMillis / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    }
    return "00:00";
  };
  return (
    <>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => {
            if (shouldPlay) {
              onTogglePlayPause();
            }
            navigator.goBack();
          }}
        >
          <CrossIcon />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onTogglePlayPause();
          }}
          style={styles.controlButton}
        >
          {!shouldPlay ? (
            <PlayVideoButton />
          ) : (
            <View
              style={{
                backgroundColor: "#FF913C",
                height: 51,
                width: 51,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
              }}
            >
              <PauseButton />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLooping(!loopValue)}>
          <RepeatingIcon fill={loopValue ? "#FF913C" : "#FFA864"} />
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <Slider
          containerStyle={styles.slider}
          minimumValue={0}
          maximumValue={duration * 1000}
          value={time}
          onValueChange={(value) => {
            onSeek(value);
          }}
          onSlidingComplete={(value) => {
            onSeek(value);
          }}
          minimumTrackTintColor="#FB913D"
          maximumTrackTintColor="#FFF8F0"
          thumbTintColor="#FB913D"
          thumbStyle={{ width: 0 }}
        />
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={styles.timeText}>{formatTime(time)}</Text>
          <Text style={styles.timeText}>{formatTime(duration * 1000)}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          onToggleFullscreen();
        }}
        style={styles.fullScreen}
      >
        <ResizeScreenIcon />
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    position: "absolute",
    zIndex: 100000,
    width: "100%",
    height: "100%",
    paddingBottom: 30,
    backgroundColor: "#ffffff10",
  },
  playbackSpeedText: {
    color: "white",
    fontSize: 16,
  },
  progressContainer: {
    width: "90%",
    alignSelf: "center",
    position: "absolute",
    zIndex: 100000,
    bottom: 60,
  },
  slider: {
    flex: 1,
  },
  timeText: {
    color: "black",
    fontSize: 12,
    marginTop: -10,
  },
  fullScreen: {
    top: 15,
    right: 15,
    position: "absolute",
    width: 30,
    height: 30,
    backgroundColor: "#25262580",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100000,
  },
  controlButton: {
    top: 15,
    zIndex: 100000,
  },
});
export default VideoControls;
