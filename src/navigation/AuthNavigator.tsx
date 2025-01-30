import React from "react";
import Signin from "../screens/auth/sign-in";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from "../screens/auth/sign-in/LoginForm";
import SignUp from "../screens/auth/sign-in/SignUp";
import ForgetPassword from "../screens/auth/sign-in/ForgetPassword";
import ResetPassword from "../screens/auth/sign-in/ResetPassword";
import OtpScreen from "../screens/auth/sign-in/OtpScreen";

type AuthNavigatorProps = {
  setCheckUserLogin: (value: boolean) => void;
};

const AuthNavigator: React.FC<AuthNavigatorProps> = ({ setCheckUserLogin }) => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#FFF9F0" },
      }}
      initialRouteName="SignIn"
    >
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        //@ts-ignore
        component={Signin}
        initialParams={{ setCheckUserLogin }}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        //@ts-ignore
        component={LoginForm}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        //@ts-ignore
        component={SignUp}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="ForgetPassword"
        //@ts-ignore
        component={ForgetPassword}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="ResetPassword"
        //@ts-ignore
        component={ResetPassword}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="OtpScreen"
        //@ts-ignore
        component={OtpScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
