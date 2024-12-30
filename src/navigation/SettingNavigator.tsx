import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "../screens/setting";
import AboutApp from "../screens/aboutApp";
import AboutAuthor from "../screens/aboutAuthor";
import Account from "../screens/account";
const SettingNavigator = () => {
  const SettingStack = createNativeStackNavigator();
  return (
    <SettingStack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#FFF9F0" },
      }}
      initialRouteName="SettingMain"
    >
      <SettingStack.Screen
        options={{ headerShown: false }}
        name="SettingMain"
        component={Setting}
      />
      <SettingStack.Screen
        options={{ headerShown: false }}
        name="AboutApp"
        component={AboutApp}
      />
      <SettingStack.Screen
        options={{ headerShown: false }}
        name="AboutAuthor"
        component={AboutAuthor}
      />
      <SettingStack.Screen
        options={{ headerShown: false }}
        name="Account"
        component={Account}
      />
    </SettingStack.Navigator>
  );
};

export default SettingNavigator;
