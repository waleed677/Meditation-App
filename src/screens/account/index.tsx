import Typography from "../../shared/typography/typography";
import React, { useCallback, useState } from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import Stack from "../../shared/stacks/stack";
import { Text, TouchableOpacity, View } from "react-native";
import BackIcon from "../../../assets/vendors/back-icon";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import OrangeUserIcon from "../../../assets/vendors/orange-user-icon";
import IconButton from "../../shared/buttons/icon-button";
import LogoutIcon from "../../../assets/vendors/logout-icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setLogout } from "../../services/authSlice";
type SignInRouteParams = {
  setCheckUserLogin: (value: boolean) => void;
};

type SignInProps = {
  route: RouteProp<{ params: SignInRouteParams }>;
};
const Index: React.FC<SignInProps> = () => {
  const [authUser, setAuthUser] = useState<any>(null);
  const navigator = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = () => {
    clearAll();
    dispatch(setLogout());
  };

  const checkUser = async () => {
    const userJson = await AsyncStorage.getItem("user");
    const user = userJson != null ? JSON.parse(userJson) : null;
    if (user !== null) {
      setAuthUser(user?.user);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkUser();
    }, [])
  );
  return (
    <MainWrapper showSafeArea={true}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        px={15}
        mt={10}
      >
        <TouchableOpacity
          onPress={() => navigator.goBack()}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <BackIcon />
          <Text allowFontScaling={false}>back</Text>
        </TouchableOpacity>
        <Typography style={{ textAlign: "center" }} type="paragraph1Bold">
          My Account
        </Typography>
        <View>
          <Text>{"           "}</Text>
        </View>
      </Stack>
      <Stack px={15} my={33} alignItems="center" gap={10}>
        <OrangeUserIcon />
        <Typography type="title">{authUser?.username}</Typography>
        <Typography type="subtitle2">{authUser?.email}</Typography>
      </Stack>
      <Stack px={15}>
        <IconButton
          onPress={() => {
            onLogout();
          }}
          backgroundColor="#FFA864"
          h={48}
          text="Sign out"
          leftIcon={<LogoutIcon />}
        />
      </Stack>
    </MainWrapper>
  );
};

export default Index;
