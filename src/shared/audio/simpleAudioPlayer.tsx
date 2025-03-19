import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Audio } from "expo-av";

const SimpleAudioPlayer = ({
  setBgSound,
  bgSound,
  playAudio,
  setBgVolume,
  selectSoundTab,
}: {
  setBgSound?: any;
  bgSound?: any;
  playAudio?: boolean;
  setBgVolume?: any;
  selectSoundTab?: any;
}) => {
  const soundArray = [
    require("../../../assets/audio/audio_bg/Bird_Chirping_Morning.mp3"),
    require("../../../assets/audio/audio_bg/Night_Ambience.mp3"),
    require("../../../assets/audio/audio_bg/Ocean_Waves.mp3"),
    require("../../../assets/audio/audio_bg/Rainny_Days.mp3"),
    require("../../../assets/audio/audio_bg/River_Flowing.mp3"),
  ];

  const loadAudio = async () => {
    try {
      // Stop the previous audio if it is playing
      if (bgSound) {
        await bgSound.stopAsync(); // Stop the previous audio
        await bgSound.unloadAsync(); // Unload it before loading a new one
      }

      // Now load the new audio
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
  }, [selectSoundTab]); // Trigger loadAudio when selectSoundTab changes

  useEffect(() => {
    const handlePlayPause = async () => {
      if (playAudio) {
        await bgSound.playAsync();
      } else {
        await bgSound.pauseAsync();
      }
    };

    handlePlayPause();
  }, [playAudio, bgSound]); // Trigger play/pause on playAudio or bgSound change

  return (
    <React.Fragment>{/* Add controls or UI components here */}</React.Fragment>
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
