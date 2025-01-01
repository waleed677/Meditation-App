import React, { useState } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import AuthNavigator from "./navigation/AuthNavigator";

const Router = () => {
  const navigationRef = useNavigationContainerRef();
  const [checkUserLogin, setCheckUserLogin] = useState(false);

  return (
    <NavigationContainer ref={navigationRef}>
      {checkUserLogin ? (
        <TabNavigator setCheckUserLogin={setCheckUserLogin} />
      ) : (
        <AuthNavigator setCheckUserLogin={setCheckUserLogin} />
      )}
    </NavigationContainer>
  );
};

export default Router;
