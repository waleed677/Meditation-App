import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Moments from "../screens/moments";
import MomentsDetail from "../screens/momentsDetail";
const MomentsNavigator = () => {
  const MomentsStack = createNativeStackNavigator();
  return (
    <MomentsStack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#FFF9F0" },
      }}
      initialRouteName="MomentsMain"
    >
      <MomentsStack.Screen
        options={{ headerShown: false }}
        name="MomentsMain"
        component={Moments}
      />
      <MomentsStack.Screen
        options={{ headerShown: false }}
        name="MomentsDetail"
        component={MomentsDetail}
      />
    </MomentsStack.Navigator>
  );
};

export default MomentsNavigator;
