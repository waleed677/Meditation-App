import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { apiUrl } from "../../constants";

const SimpleAudioPlayer = ({
  setBgSound,
  bgSound,
  playAudio,
  setBgVolume,
  setPlayAudio,
  selectSoundTab,
}: {
  setBgSound?: any;
  bgSound?: any;
}) => {
  // const togglePlayPause = async () => {
  //   if (!bgSound) return;

  //   if (playAudio) {
  //     await bgSound.playAsync();
  //   } else {
  //     await bgSound.pauseAsync();
  //   }

  //   setPlayAudio((prev: boolean) => !prev);
  // };
  const soundArray = [
    require("../../../assets/audio/audio_bg/Bird_Chirping_Morning.mp3"),
    require("../../../assets/audio/audio_bg/Night_Ambience.mp3"),
    require("../../../assets/audio/audio_bg/Ocean_Waves.mp3"),
    require("../../../assets/audio/audio_bg/Rainny_Days.mp3"),
    require("../../../assets/audio/audio_bg/River_Flowing.mp3"),
  ];
  const loadAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        soundArray[selectSoundTab],
        {
          shouldPlay: playAudio,
          isLooping: true,
        }
      );
      setBgSound(sound);
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  const onVolumeChange = (value: number) => {
    setBgVolume(value);
    if (bgSound) {
      bgSound.setVolumeAsync(value);
    }
  };

  useEffect(() => {
    loadAudio();

    return () => {
      if (bgSound) {
        bgSound.unloadAsync();
      }
    };
  }, [soundArray[selectSoundTab]]);

  useEffect(() => {
    const handlePlayPause = async () => {
      if (playAudio) {
        await bgSound.playAsync();
      } else {
        await bgSound.pauseAsync();
      }
    };

    handlePlayPause();
  }, [playAudio]);

  return (
    <React.Fragment>
      {/* <View style={styles.container}> */}
      {/* <View style={styles.controls}> */}
      {/* Play/Pause button */}
      {/* <TouchableOpacity onPress={togglePlayPause} style={styles.button}>
            <Text>{isPlaying ? "Pause" : "Play"}</Text>
          </TouchableOpacity> */}

      {/* </View>
      </View> */}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FF913C",
    padding: 10,
    borderRadius: 50,
    marginBottom: 20,
  },
  slider: {
    width: "100%",
  },
});

export default SimpleAudioPlayer;
