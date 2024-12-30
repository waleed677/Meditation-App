import Typography from "../../shared/typography/typography";
import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import Stack from "../../shared/stacks/stack";
import { Text, TouchableOpacity, View } from "react-native";
import BackIcon from "../../../assets/vendors/back-icon";
import { useNavigation } from "@react-navigation/native";
import OrangeUserIcon from "../../../assets/vendors/orange-user-icon";
import IconButton from "../../shared/buttons/icon-button";
import LogoutIcon from "../../../assets/vendors/logout-icon";

const Index = () => {
  const navigator = useNavigation();
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
          <Text>back</Text>
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
        <Typography type="title">Emily Tan</Typography>
        <Typography type="subtitle2">emilytan@gmail.com</Typography>
      </Stack>
      <Stack px={15}>
        <IconButton
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
