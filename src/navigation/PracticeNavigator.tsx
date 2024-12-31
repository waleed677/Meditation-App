import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Practice from "../screens/practice";
import PracticeList from "../screens/practiceList";
import VideoPlayerPage from "../screens/videoPlayerPage";
import AudioPlayerPage from "../screens/audioPlayerPage";

const PracticeNavigator = () => {
  const PracticeStack = createNativeStackNavigator();
  return (
    <PracticeStack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#FFF9F0" },
      }}
      initialRouteName="PracticeMain"
    >
      <PracticeStack.Screen
        options={{ headerShown: false }}
        name="PracticeMain"
        component={Practice}
      />
      <PracticeStack.Screen
        options={{ headerShown: false }}
        name="PracticeList"
        component={PracticeList}
      />
      <PracticeStack.Screen
        options={{ headerShown: false }}
        name="VideoPlayerDetail"
        component={VideoPlayerPage}
      />
      <PracticeStack.Screen
        options={{ headerShown: false }}
        name="AudioPlayerDetail"
        component={AudioPlayerPage}
      />
    </PracticeStack.Navigator>
  );
};

export default PracticeNavigator;
