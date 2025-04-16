import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { IMAGE_BASE_URL } from "../../constants";
import { joinFileLink } from "../../helper/commonFun";

const width = Dimensions.get("window").width;

export default function ExpoVideoPlayer({
  thumbnail_url,
  videoUrl,
}: {
  thumbnail_url: string;
  videoUrl: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

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
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player?.playing,
  });

  return (
    <View style={styles.contentContainer}>
      <View style={styles.videoWrapper}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentPosition={{ dx: 0, dy: 0 }}
        />

        {isLoading && (
          <ImageBackground
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "center",
              alignItems: "center",
              width: width - 30,
              height: 230,
              borderRadius: 10,
              top: 15,
              zIndex: 1,
            }}
            source={
              thumbnail_url
                ? { uri: joinFileLink(thumbnail_url) }
                : require("../../../assets/images/video_box.png")
            }
            alt="bg-image"
          >
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          </ImageBackground>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  videoWrapper: {
    width: width - 30,
    height: 260,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
    position: "relative",
  },
  video: {
    width: width - 30,
    height: 230,
    borderRadius: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    width: width - 30,
    height: 230,
    borderRadius: 0,
    top: 0,
    zIndex: 1,
  },
});
