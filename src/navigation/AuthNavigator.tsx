import React from "react";
import Signin from "../screens/auth/sign-in";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
