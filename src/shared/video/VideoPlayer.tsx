import React, { useRef, useState, useEffect } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { Video } from "expo-av";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import VideoControls from "./VideoControls";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";
const playbackSpeedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];
const width = Dimensions.get("window").width;
const PlayLessonScreen = ({
  setIsFullscreen,
  isFullscreen,
  setCurrentTime,
  currentTime,
  lessons,
  selectedLesson,
  videoSource,
  setIsLooping,
  isLooping,
}) => {
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [orientation, setOrientation] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart((event) => {
      //get the tap position on X
      const touchX = event.absoluteX;
      let mid = Dimensions.get("screen").width / 2;
      //if tap position is before the mid point, set video back by 10s
      if (touchX < mid) {
        videoRef.current.getStatusAsync().then((status) => {
          const newPosition = Math.max(status.positionMillis - 10000, 0);
          videoRef.current.setPositionAsync(newPosition);
        });
      }
      //if tap position is before the mid point, set video forward by 10s
      else {
        videoRef.current.getStatusAsync().then((status) => {
          const newPosition = Math.min(
            status.positionMillis + 10000,
            status.durationMillis
          );
          videoRef.current.setPositionAsync(newPosition);
        });
      }
    });
  const singleTap = Gesture.Tap().onStart((event) => {
    setShowControls(!showControls);
    // Simulate show/hide controls behavior here
  });
  //sets the current time, if video is finished, moves to the next video
  const handlePlaybackStatusUpdate = (status) => {
    setCurrentTime(status.positionMillis);
    if (status.didJustFinish && !isLooping) {
      setCurrentTime(0);
      videoRef?.current?.setPositionAsync(0);
      setIsPlaying(false);
    }
  };
  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };
  const playNextVideo = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex((prevIndex) => prevIndex + 1);
    }
  };
  const playPreviousVideo = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prevIndex) => prevIndex - 1);
    }
  };
  const togglePlaybackSpeed = () => {
    //gets the next playback speed index
    const nextSpeedIndex = playbackSpeedOptions.indexOf(playbackSpeed) + 1;
    if (nextSpeedIndex < playbackSpeedOptions.length) {
      videoRef.current.setRateAsync(playbackSpeedOptions[nextSpeedIndex], true);
      setPlaybackSpeed(playbackSpeedOptions[nextSpeedIndex]);
    }
    //if the last option i.e. 2x speed is applied. then moves to first option
    else {
      videoRef.current.setRateAsync(playbackSpeedOptions[0], true);
      setPlaybackSpeed(playbackSpeedOptions[0]);
    }
  };
  const toggleMute = () => {
    videoRef.current.setIsMutedAsync(isMuted);
    setIsMuted(!isMuted);
  };
  const toggleFullscreen = async () => {
    // Lock the orientation first before updating fullscreen state
    if (!isFullscreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
      // Wait for the orientation to lock before updating fullscreen state
      setIsFullscreen(true);
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setIsFullscreen(false);
    }
    // Update the orientation state once it's locked
    const currentOrientation = await ScreenOrientation.getOrientationAsync();
    setOrientation(currentOrientation);
  };

  const setVideoPosition = () => {
    setLoading(true);
    if (videoRef.current) {
      videoRef.current.setPositionAsync(currentTime);
    }
  };
  const renderVideo = () => {
    const videoStyles = {
      flex: 1,
      height: isFullscreen ? "100%" : 250, // Ensure fullscreen takes full height
      width: isFullscreen ? "100%" : width - 30, // Adjust width for fullscreen
      borderRadius: isFullscreen ? 0 : 10, // Remove border radius in fullscreen
    };

    return (
      <>
        <Video
          ref={videoRef}
          source={{ uri: videoSource }}
          rate={playbackSpeed}
          isMuted={false}
          isLooping={isLooping}
          shouldPlay={isPlaying}
          resizeMode={isFullscreen ? "cover" : "stretch"} // "cover" for fullscreen, "stretch" for small view
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          style={videoStyles}
          onLoad={setVideoPosition}
        />

        {!loading && (
          <View
            style={{
              ...videoStyles,
              justifyContent: "center",
              alignItems: "center",

              position: "absolute",
              zIndex: 10000000000,
            }}
          >
            <ActivityIndicator size="large" color="#6699FF" />
          </View>
        )}
      </>
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async (e) => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setIsFullscreen(false);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <GestureHandlerRootView
      style={{
        flex: isFullscreen ? 1 : 0,
        height: isFullscreen ? "auto" : 250,
        width: "auto",
        position: "relative",
      }}
    >
      {/* <Spinner visible={isLoading} size="large" /> */}
      {lessons.length > 0 && (
        <>
          <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
            {renderVideo()}
          </GestureDetector>
          {!showControls && (
            <VideoControls
              onTogglePlayPause={togglePlayPause}
              onPlayPreviousVideo={playPreviousVideo}
              onPlayNextVideo={playNextVideo}
              onToggleMute={toggleMute}
              onTogglePlaybackSpeed={togglePlaybackSpeed}
              onSeek={(value) => {
                videoRef?.current?.setPositionAsync(+value);
                setCurrentTime(+value);
              }}
              onToggleFullscreen={toggleFullscreen}
              duration={+selectedLesson?.videoTotalDuration}
              currentTime={currentTime}
              rate={playbackSpeed}
              shouldPlay={isPlaying}
              fullScreenValue={isFullscreen}
              setIsLooping={setIsLooping}
              loopValue={isLooping}
            />
          )}
        </>
      )}

      {orientation == 1 && <View>{/* Simulate other UI elements here */}</View>}
    </GestureHandlerRootView>
  );
};
export default PlayLessonScreen;
