import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import PlayVideoButton from "../../../assets/vendors/play-video-button";
import PauseButton from "../../../assets/vendors/pause-button-icon";
import RepeatingIcon from "../../../assets/vendors/repeatinf-icon";
import Slider from "@react-native-community/slider";
import Stack from "../stacks/stack";
import CrossIcon from "../../../assets/vendors/cross-icon";
import { apiUrl } from "../../constants";

const { width } = Dimensions.get("window");

const AudioPlayer = ({ data }: { data: any }) => {
  const [sound, setSound] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isRepeating, setIsRepeating] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const togglePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis / 1000);
      setCurrentTime(status.positionMillis / 1000);
      if (status.didJustFinish && isRepeating) {
        sound.playAsync();
      }
    }
  };

  const onSeek = async (value: number) => {
    setCurrentTime(value);
    if (sound) {
      await sound.setPositionAsync(value * 1000);
    }
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const loadAudio = async () => {
    try {
      const audioUrl = `${apiUrl}/${data?.file_url}`;
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false },
        handlePlaybackStatusUpdate
      );
      setSound(sound);
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  useEffect(() => {
    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <View style={{ height: 150, position: "relative" }}>
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

const styles = StyleSheet.create({
  controls: {
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

export default AudioPlayer;
