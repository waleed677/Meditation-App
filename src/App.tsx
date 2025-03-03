import { Provider } from "react-redux";
import Router from "./Router";
import { useFonts } from "expo-font";
import { store } from "./store/store";
import ToastManager, { Toast } from "toastify-react-native";
// export default function App() {
//   const [fontsLoaded] = useFonts({
//     "Sansita-BoldItalic": require("../assets/fonts/Sansita-BoldItalic.ttf"),
//     "Sansita-Bold": require("../assets/fonts/Sansita-Bold.ttf"),
//   });
//   return (
//     <Provider store={store}>
//       <ToastManager showCloseIcon={false} showProgressBar={false} />
//       <Router />
//     </Provider>
//   );
// }

import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export function SplashVideo({ onLoaded, onFinish }) {
  const video = useRef(null);
  const [lastStatus, setStatus] = useState<AVPlaybackStatus>({});
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <Video
      ref={video}
      style={StyleSheet.absoluteFill}
      source={
        isTablet
          ? require("../assets/splash-tablet.mp4")
          : require("../assets/splash.mp4")
      }
      shouldPlay={!(lastStatus.isLoaded && lastStatus.didJustFinish)}
      isLooping={false}
      resizeMode={ResizeMode.COVER}
      onPlaybackStatusUpdate={(status) => {
        if (status.isLoaded) {
          if (lastStatus.isLoaded !== status.isLoaded) {
            onLoaded();
          }
          if (status.didJustFinish) {
            onFinish();
          }
        }
        setStatus(() => status);
      }}
    />
  );
}

// Prevent automatic hiding of the splash screen
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  return (
    <AnimatedSplashScreen>
      <MainScreen />
    </AnimatedSplashScreen>
  );
}

function AnimatedSplashScreen({ children }) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashVideoComplete, setSplashVideoComplete] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    if (isAppReady && isSplashVideoComplete) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady, isSplashVideoComplete]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load additional resources or logic here
      await Promise.all([]);
    } catch (e) {
      console.error("Error during splash screen hide", e);
    } finally {
      setAppReady(true);
    }
  }, []);

  const videoElement = useMemo(() => {
    return (
      <SplashVideo
        onLoaded={onImageLoaded}
        onFinish={() => {
          setSplashVideoComplete(true);
        }}
      />
    );
  }, [onImageLoaded, setSplashVideoComplete]);

  return (
    <React.Fragment>
      {isAppReady && <View style={{ flex: 1 }}>{children}</View>}
      {!isSplashAnimationComplete && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            width: width,
            height: height + 100,
            zIndex: 1000,
            elevation: 1000,
          }}
        >
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: Constants.expoConfig?.splash?.backgroundColor,
                opacity: animation,
              },
            ]}
          >
            {videoElement}
          </Animated.View>
        </View>
      )}
    </React.Fragment>
  );
}

function MainScreen() {
  const [fontsLoaded] = useFonts({
    "Sansita-BoldItalic": require("../assets/fonts/Sansita-BoldItalic.ttf"),
    "Sansita-Bold": require("../assets/fonts/Sansita-Bold.ttf"),
  });
  return (
    <Provider store={store}>
      <ToastManager showCloseIcon={false} showProgressBar={false} />
      <Router />
    </Provider>
  );
}
