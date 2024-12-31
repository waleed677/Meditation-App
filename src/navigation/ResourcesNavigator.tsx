import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Resources from "../screens/resources";
import ResourcesList from "../screens/resourcesList";
import VideoPlayerPage from "../screens/videoPlayerPage";

const ResourcesNavigator = () => {
  const ResourcesStack = createNativeStackNavigator();
  return (
    <ResourcesStack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#FFF9F0" },
      }}
      initialRouteName="ResourcesMain"
    >
      <ResourcesStack.Screen
        options={{ headerShown: false }}
        name="ResourcesMain"
        component={Resources}
      />
      <ResourcesStack.Screen
        options={{ headerShown: false }}
        name="ResourcesList"
        component={ResourcesList}
      />
      <ResourcesStack.Screen
        options={{ headerShown: false }}
        name="VideoPlayerDetail"
        component={VideoPlayerPage}
      />
    </ResourcesStack.Navigator>
  );
};

export default ResourcesNavigator;
