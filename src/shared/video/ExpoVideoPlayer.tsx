import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button, Dimensions } from "react-native";
import { IMAGE_BASE_URL } from "../../constants";
const width = Dimensions.get("window").width;

export default function ExpoVideoPlayer({ videoUrl }: { videoUrl: string }) {
  function isAbsoluteUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }
  const videoSource = isAbsoluteUrl(videoUrl)
    ? videoUrl
    : `${IMAGE_BASE_URL}${videoUrl}`;
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.contentContainer}>
      <View
        style={{
          width: width - 30,
          height: 260,
          borderRadius: 10,
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          marginTop: -30,
        }}
      >
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentPosition={{ dx: 0, dy: 0 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  video: {
    width: width - 30,
    height: 230,
    borderRadius: 10,
    overflow: "hidden",
  },
});
