import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./HomeNavigator";
import SelectHomeIcon from "../../assets/vendors/select-home-icon";
import UnSelectHomeIcon from "../../assets/vendors/un-select-home-icon";
import { Platform } from "react-native";
import UnSelectPracticeIcon from "../../assets/vendors/un-select-practice-icon";
import SelectPracticeIcon from "../../assets/vendors/select-practice-icon";
import PracticeNavigator from "./PracticeNavigator";
import ResourcesNavigator from "./ResourcesNavigator";
import UnSelectResourcesIcon from "../../assets/vendors/un-select-resources-icon";
import SelectResourcesIcon from "../../assets/vendors/select-resources-icon";
import UnSelectMomentsIcon from "../../assets/vendors/un-select-moments-icon";
import SelectMomentsIcon from "../../assets/vendors/select-moments-icon";
import UnSelectSettingIcon from "../../assets/vendors/un-select-setting-icon";
import SelectSettingIcon from "../../assets/vendors/select-setting-icon";
import MomentsNavigator from "./MomentsNavigator";
import SettingNavigator from "./SettingNavigator";

const TabNavigator = () => {
  const BottomTab = createBottomTabNavigator();
  const Device = Platform.OS === "android" ? true : false;
  return (
    <>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarAllowFontScaling: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#99CCFF",
          tabBarStyle: {
            height: Device ? 60 : 70,
            backgroundColor: "#2762A6",
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
        initialRouteName="Home"
      >
        <BottomTab.Screen
          options={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? <SelectHomeIcon /> : <UnSelectHomeIcon />,
          })}
          name="Home"
          component={Home}
        />
        <BottomTab.Screen
          options={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? <SelectPracticeIcon /> : <UnSelectPracticeIcon />,
          })}
          name="Practice"
          component={PracticeNavigator}
        />
        <BottomTab.Screen
          options={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? <SelectResourcesIcon /> : <UnSelectResourcesIcon />,
          })}
          name="Resources"
          component={ResourcesNavigator}
        />
        <BottomTab.Screen
          options={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? <SelectMomentsIcon /> : <UnSelectMomentsIcon />,
          })}
          name="Moments"
          component={MomentsNavigator}
        />
        <BottomTab.Screen
          options={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? <SelectSettingIcon /> : <UnSelectSettingIcon />,
          })}
          name="Settings"
          component={SettingNavigator}
        />
      </BottomTab.Navigator>
    </>
  );
};

export default TabNavigator;
