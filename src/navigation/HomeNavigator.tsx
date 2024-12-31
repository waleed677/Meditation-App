import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import VisualPractice from "../screens/visualPractice";
import AudioPractice from "../screens/audioPractice";
import VideoPlayerPage from "../screens/videoPlayerPage";
import AudioPlayerPage from "../screens/audioPlayerPage";
const HomeNavigator = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <HomeStack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#FFF9F0" },
      }}
      initialRouteName="HomeMain"
    >
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="HomeMain"
        component={Home}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="VisualPractice"
        component={VisualPractice}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="AudioPractice"
        component={AudioPractice}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="VideoPlayerDetail"
        component={VideoPlayerPage}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="AudioPlayerDetail"
        component={AudioPlayerPage}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
