import React from "react";
import { TouchableOpacity } from "react-native";
import Typography from "../../../shared/typography/typography";
import Stack from "../../../shared/stacks/stack";
import IconButton from "../../../shared/buttons/icon-button";
import AppleIcon from "../../../../assets/vendors/apple-icon";
import GoogleIcon from "../../../../assets/vendors/google-icon";
import UserLabelIcon from "../../../../assets/vendors/user-label-icon";
import { RouteProp } from "@react-navigation/native";
import MainWrapper from "../../../shared/wrappers/main-wrapper";

type SignInRouteParams = {
  setCheckUserLogin: (value: boolean) => void;
};

type SignInProps = {
  route: RouteProp<{ params: SignInRouteParams }>;
};

const SignIn: React.FC<SignInProps> = ({ route }) => {
  const { setCheckUserLogin } = route.params;

  return (
    <MainWrapper showSafeArea={true}>
      <Stack alignItems="center" justifyContent="center" flex={1}>
        <UserLabelIcon />
        <Stack mt={18} w={256}>
          <Typography style={{ textAlign: "center" }} type="paragraph1Bold">
            Hi there
          </Typography>
          <Typography style={{ textAlign: "center" }} type="paragraph1Bold">
            I am happy you are here!
          </Typography>
          <Typography
            type="paragraph1"
            style={{ marginVertical: 32, textAlign: "center" }}
          >
            You can sync your favourites, downloads. Start now by signing in.
          </Typography>
          <Stack gap={10} mb={62}>
            <IconButton text="Sign in with Apple" leftIcon={<AppleIcon />} />
            <IconButton leftIcon={<GoogleIcon />} text="Sign in with Google" />
          </Stack>
          <TouchableOpacity onPress={() => setCheckUserLogin(true)}>
            <Typography
              type="paragraph1Bold"
              style={{ textAlign: "center", textDecorationLine: "underline" }}
            >
              Continue without signing in
            </Typography>
          </TouchableOpacity>
        </Stack>
      </Stack>
    </MainWrapper>
  );
};

export default SignIn;
