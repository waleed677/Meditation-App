import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import PlayVideoButton from "../../../assets/vendors/play-video-button";
import RepeatingIcon from "../../../assets/vendors/repeatinf-icon";
import Stack from "../stacks/stack";
import CrossIcon from "../../../assets/vendors/cross-icon";
import Slider from "@react-native-community/slider";
import PauseButton from "../../../assets/vendors/pause-button-icon";

// Video source URL
const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

// Get screen width and height
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

  // Handle playback status updates
  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis / 1000);
      setCurrentTime(status.positionMillis / 1000);
      if (status.didJustFinish && isRepeating) {
        videoRef.current?.playAsync();
      }
    }
  };

  // Toggle repeat state
  const toggleRepeat = (): void => {
    setIsRepeating(!isRepeating);
  };

  // Seek to a specific time in the video
  const onSeek = (value: number): void => {
    setCurrentTime(value);
    videoRef.current?.setPositionAsync(value * 1000);
  };

  // Toggle play/pause functionality
  const togglePlayPause = async (): Promise<void> => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
    } else {
      await videoRef.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle orientation changes
  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions?.get("window");
      setOrientation(width > height ? "landscape" : "portrait");
    };

    // Add event listener for orientation changes
    Dimensions?.addEventListener("change", updateOrientation);

    // Clean up event listener on component unmount
    return () => {
      if (Dimensions?.removeEventListener) {
        Dimensions?.removeEventListener("change", updateOrientation);
      }
    };
  }, []);

  // Adjust layout and styles based on orientation
  const videoStyle =
    orientation === "landscape" ? styles.landscapeVideo : styles.portraitVideo;

  return (
    <View style={{ height: 250, position: "relative" }}>
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

// Format time (minutes:seconds)
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
};

// Styles for portrait and landscape orientation
const styles = StyleSheet.create({
  portraitVideo: {
    height: width - 195,
    resizeMode: "stretch",
    borderRadius: 16,
  },
  landscapeVideo: {
    height: height, // Use full screen height in landscape
    width: width, // Use full screen width in landscape
    resizeMode: "contain", // To prevent distortion
  },
  controls: {
    marginTop: 10,
    position: "absolute",
    bottom: 40,
    width: width - 35,
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
