import React from "react";
// import { TouchableOpacity } from "react-native";
// import Typography from "../../../shared/typography/typography";
import Stack from "../../../shared/stacks/stack";
import IconButton from "../../../shared/buttons/icon-button";
import AppleIcon from "../../../../assets/vendors/apple-icon";
import GoogleIcon from "../../../../assets/vendors/google-icon";
// import UserLabelIcon from "../../../../assets/vendors/user-label-icon";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
// import MainWrapper from "../../../shared/wrappers/main-wrapper";
import AuthWrapper from "../../../shared/wrappers/auth-wrapper";
// import { setLogin } from "../../../services/authSlice";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../store/store";

type SignInRouteParams = {
  setCheckUserLogin: (value: boolean) => void;
};

type SignInProps = {
  route: RouteProp<{ params: SignInRouteParams }>;
};

type RootStackParamList = {
  Login: undefined;
};

const SignIn: React.FC<SignInProps> = ({ route }) => {
  // const { setCheckUserLogin } = route.params;
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  // const dispatch = useDispatch<AppDispatch>();
  return (
    <AuthWrapper text="You can sync your favourites, downloads. Start now by signing in.">
      <Stack gap={10} mb={40}>
        <IconButton text="Sign in with Apple" leftIcon={<AppleIcon />} />
        <IconButton leftIcon={<GoogleIcon />} text="Sign in with Google" />
        <IconButton
          text="Sign in with Email"
          onPress={() => navigator.navigate("Login")}
        />
      </Stack>
      {/* <TouchableOpacity onPress={() => dispatch(setLogin())}>
        <Typography
          type="paragraph1Bold"
          style={{ textAlign: "center", textDecorationLine: "underline" }}
        >
          Continue without signing in
        </Typography>
      </TouchableOpacity> */}
    </AuthWrapper>
  );
};

export default SignIn;
