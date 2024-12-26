import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./HomeNavigator";
import SelectHomeIcon from "../../assets/vendors/select-home-icon";
import UnSelectHomeIcon from "../../assets/vendors/un-select-home-icon";
import { Platform } from "react-native";
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
              focused ? <SelectHomeIcon /> : <UnSelectHomeIcon />,
          })}
          name="Practice"
          component={Home}
        />
        <BottomTab.Screen
          options={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? <SelectHomeIcon /> : <UnSelectHomeIcon />,
          })}
          name="Resources"
          component={Home}
        />
        <BottomTab.Screen
          options={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? <SelectHomeIcon /> : <UnSelectHomeIcon />,
          })}
          name="Moments"
          component={Home}
        />
        <BottomTab.Screen
          options={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? <SelectHomeIcon /> : <UnSelectHomeIcon />,
          })}
          name="Settings"
          component={Home}
        />
      </BottomTab.Navigator>
    </>
  );
};

export default TabNavigator;
