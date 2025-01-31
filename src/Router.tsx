import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from "react-hook-form";
import { useLoginMutation } from "./services/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { setLogin } from "./services/authSlice";
const Router = () => {
  const navigationRef = useNavigationContainerRef();
  const [checkUserLogin, setCheckUserLogin] = useState(false);
  const { isLogin } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (isLogin) {
      setCheckUserLogin(true);
    } else {
      setCheckUserLogin(false);
    }
  }, [isLogin]);


  const checkUser = async () => {
    const userJson = await AsyncStorage.getItem("user");
    const user = userJson != null ? JSON.parse(userJson) : null;
    if (user !== null) {
      dispatch(setLogin());
    }
  };



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
