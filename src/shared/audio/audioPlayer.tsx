import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import { Audio } from "expo-av";
import PlayVideoButton from "../../../assets/vendors/play-video-button";
import PauseButton from "../../../assets/vendors/pause-button-icon";
import RepeatingIcon from "../../../assets/vendors/repeatinf-icon";
import Slider from "@react-native-community/slider";
import Stack from "../stacks/stack";
import { apiUrl } from "../../constants";
import MusicListIcon from "../../../assets/vendors/musice-list-icon";

const { width } = Dimensions.get("window");

const AudioPlayer = ({
  data,
  setModalVisible,
  setSound,
  sound,
  setPlayAudio,
  bgSound,
}: {
  data: any;
  setModalVisible: (visible: boolean) => void;
  setSound: (sound: Audio.Sound | null) => void;
  sound: Audio.Sound | null;
  setPlayAudio: (play: boolean) => void;
  bgSound?: Audio.Sound | null;
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isRepeating, setIsRepeating] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const togglePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      // Pause both sound and bgSound
      await sound.pauseAsync();
      await bgSound?.pauseAsync();
    } else {
      if (currentTime === duration) {
        // If currentTime is equal to duration, reset to start
        await sound.setPositionAsync(0);
        await bgSound?.setPositionAsync(0);
        setCurrentTime(0); // Reset the slider to 0
      }

      // Play both sound and bgSound
      await sound.playAsync();
      await bgSound?.playAsync();
    }

    setIsPlaying(!isPlaying);
    //@ts-ignore
    setPlayAudio((prev: boolean) => !prev);
  };

  const handlePlaybackStatusUpdate = async (status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis / 1000);
      setCurrentTime(status.positionMillis / 1000);

      // When audio finishes playing
      if (status.didJustFinish) {
        if (isRepeating) {
          // Loop both sound and bgSound
          await sound?.playAsync();
          await bgSound?.playAsync();
          sound?.setPositionAsync(0);
          bgSound?.setPositionAsync(0);
          setDuration(0); // Reset the duration to 0 for a new loop
          setIsPlaying(true);
          setPlayAudio(true);
        } else {
          // Pause and reset both sound and bgSound when repeat is off
          await sound?.setPositionAsync(0);
          await bgSound?.setPositionAsync(0);
          await sound?.pauseAsync();
          await bgSound?.pauseAsync();
          setCurrentTime(0);
          setDuration(0);
          setIsPlaying(false);
          setPlayAudio(false);
        }
      }
    }
  };

  const loadAudio = async () => {
    try {
      const audioUrl = `${apiUrl}/${data?.file_url}`;
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false, isLooping: isRepeating },
        handlePlaybackStatusUpdate
      );
      setSound(sound);
    } catch (error) {
      console.error("Error loading sound:", error);
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
    <View style={{ height: 170, position: "relative" }}>
      <View style={styles.controls}>
        <View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime} // The slider is controlled by the current time of the audio
            onSlidingComplete={onSeek} // Allows seeking within the audio
            minimumTrackTintColor="#FF913C"
            maximumTrackTintColor="#FFF9F0"
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
          <Pressable onPress={() => setModalVisible(true)}>
            <MusicListIcon />
          </Pressable>
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
    width: "100%",
  },
  backgroundAudioControls: {
    marginTop: 20,

    alignItems: "center",
  },
});

export default AudioPlayer;
