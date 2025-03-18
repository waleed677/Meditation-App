import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "../screens/setting";
import AboutApp from "../screens/aboutApp";
import AboutAuthor from "../screens/aboutAuthor";
import Account from "../screens/account";
import Favorites from "../screens/favourites";
import VideoPlayerPage from "../screens/videoPlayerPage";
import AudioPlayerPage from "../screens/audioPlayerPage";
import ResourcesDetail from "../screens/resourcesDetail";
import { RouteProp } from "@react-navigation/native";

type SignInRouteParams = {
  setCheckUserLogin: (value: boolean) => void;
};

type SettingNavigatorProps = {
  route: RouteProp<{ params: SignInRouteParams }>;
};

const SettingNavigator: React.FC<SettingNavigatorProps> = ({ route }) => {
  const { setCheckUserLogin } = route.params;
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
        //@ts-ignore
        component={Account}
        initialParams={{ setCheckUserLogin }}
      />
      <SettingStack.Screen
        options={{ headerShown: false }}
        name="Favorites"
        //@ts-ignore
        component={Favorites}
        initialParams={{ setCheckUserLogin }}
      />
      <SettingStack.Screen
        options={{ headerShown: false }}
        name="ResourcesDetail"
        component={ResourcesDetail}
      />
      <SettingStack.Screen
        options={{ headerShown: false }}
        name="VideoPlayerDetail"
        component={VideoPlayerPage}
      />
      <SettingStack.Screen
        options={{ headerShown: false }}
        name="AudioPlayerDetail"
        component={AudioPlayerPage}
      />
    </SettingStack.Navigator>
  );
};

export default SettingNavigator;
