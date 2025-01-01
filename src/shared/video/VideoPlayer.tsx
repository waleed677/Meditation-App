import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import PlayVideoButton from "../../../assets/vendors/play-video-button";
import RepeatingIcon from "../../../assets/vendors/repeatinf-icon";
import Stack from "../stacks/stack";
import CrossIcon from "../../../assets/vendors/cross-icon";
import Slider from "@react-native-community/slider";
import PauseButton from "../../../assets/vendors/pause-button-icon";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const { width, height } = Dimensions?.get("window");

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isRepeating, setIsRepeating] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      //@ts-ignore
      setDuration(status.durationMillis / 1000);
      setCurrentTime(status.positionMillis / 1000);
      if (status.didJustFinish && isRepeating) {
        videoRef.current?.playAsync();
      }
    }
  };

  const toggleRepeat = (): void => {
    setIsRepeating(!isRepeating);
  };

  const onSeek = (value: number): void => {
    setCurrentTime(value);
    videoRef.current?.setPositionAsync(value * 1000);
  };

  const togglePlayPause = async (): Promise<void> => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
    } else {
      await videoRef.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions?.get("window");
      setOrientation(width > height ? "landscape" : "portrait");
    };

    Dimensions?.addEventListener("change", updateOrientation);

    return () => {
      //@ts-ignore
      if (Dimensions?.removeEventListener) {
        //@ts-ignore
        Dimensions?.removeEventListener("change", updateOrientation);
      }
    };
  }, []);

  const videoStyle =
    orientation === "landscape" ? styles.landscapeVideo : styles.portraitVideo;

  return (
    <View
      style={{
        height: width - 190,
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <Video
        ref={videoRef}
        source={{ uri: videoSource }}
        style={videoStyle}
        shouldPlay={isPlaying}
        isLooping={isRepeating}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        useNativeControls={false}
      />

      <View style={styles.controls}>
        <View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            onValueChange={onSeek}
            minimumTrackTintColor="#FF913C"
            maximumTrackTintColor="#FFF9F0"
            thumbTintColor="#1FB3A0"
            thumbImage={require("../../../assets/images/thumbSmallImage.png")}
          />
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            px={10}
            mt={-10}
          >
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </Stack>
        </View>

        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around"
        >
          <CrossIcon />
          <TouchableOpacity onPress={togglePlayPause}>
            {!isPlaying ? (
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
          <TouchableOpacity onPress={toggleRepeat}>
            <RepeatingIcon />
          </TouchableOpacity>
        </Stack>
      </View>
    </View>
  );
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
};

const styles = StyleSheet.create({
  portraitVideo: {
    height: width - 180,
    resizeMode: "stretch",
    borderRadius: 16,
  },
  landscapeVideo: {
    height: height,
    width: width,
    resizeMode: "contain",
  },
  controls: {
    position: "absolute",
    width: width - 35,
    bottom: 10,
  },
  timeText: {
    fontSize: 12,
    color: "#000000",
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default VideoPlayer;
