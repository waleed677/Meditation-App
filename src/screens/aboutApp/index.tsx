import Typography from "../../shared/typography/typography";
import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import Stack from "../../shared/stacks/stack";
import { Text, TouchableOpacity, View } from "react-native";
import BackIcon from "../../../assets/vendors/back-icon";
import { useNavigation } from "@react-navigation/native";
import OrangeUserIcon from "../../../assets/vendors/orange-user-icon";
import { useGetSettingsQuery } from "../../services/resources";

const Index = () => {
  const navigator = useNavigation();
  const { data } = useGetSettingsQuery({});

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
          About The App
        </Typography>
        <View>
          <Text>{"           "}</Text>
        </View>
      </Stack>
      <Stack px={15} alignItems="center" gap={10} mt={17}>
        <OrangeUserIcon />
        <Typography
          style={{ fontStyle: "italic", color: "#2762A6" }}
          type="title2"
        >
          Blue Whale Mindfulness
        </Typography>
        <Typography type="paragraph1">{data?.settings?.about_app}</Typography>
      </Stack>
    </MainWrapper>
  );
};

export default Index;
