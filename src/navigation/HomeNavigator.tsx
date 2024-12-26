import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";

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
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
