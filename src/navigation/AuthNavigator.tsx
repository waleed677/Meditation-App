import React from "react";
import Signin from "../screens/auth/sign-in";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Define the type for the navigation props
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
        initialParams={{ setCheckUserLogin }} // Pass as an object to initialParams
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
