import React, { useState } from "react";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button, Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function VideoCard() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true; // Initially set loop to true
    player.play();
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  // Update the playing state when the video playing status changes
  const { isPlaying: playerIsPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  // Update the play state based on player's playing status
  if (playerIsPlaying !== isPlaying) {
    setIsPlaying(playerIsPlaying);
  }

  // Toggle loop behavior
  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
    player.loop = !isRepeating; // Toggle the loop state of the player
  };

  return (
    <View style={{ height: 215 }}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls={false}
      />
      <View>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
        <Button
          title={isRepeating ? "Disable Repeat" : "Enable Repeat"}
          onPress={toggleRepeat}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    height: width - 195,
    resizeMode: "stretch",
  },
});
