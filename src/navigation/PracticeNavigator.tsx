import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Practice from "../screens/practice";
import PracticeList from "../screens/practiceList";
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
    </PracticeStack.Navigator>
  );
};

export default PracticeNavigator;
