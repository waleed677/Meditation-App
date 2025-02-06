import Typography from "../../shared/typography/typography";
import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import Stack from "../../shared/stacks/stack";
import { Text, TouchableOpacity, View } from "react-native";
import BackIcon from "../../../assets/vendors/back-icon";
import { useNavigation } from "@react-navigation/native";
import BlueBgUserIcon from "../../../assets/vendors/blue-bg-user-icon";
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
          About {data?.settings?.author_name}
        </Typography>
        <View>
          <Text>{"           "}</Text>
        </View>
      </Stack>
      <Stack px={15} alignItems="center" gap={10} mt={17}>
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 100,
            backgroundColor: "#2762A6",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BlueBgUserIcon />
        </View>
        <Typography
          style={{ fontStyle: "italic", color: "#2762A6" }}
          type="title2"
        >
          {data?.settings?.author_name}
        </Typography>
        <Typography style={{ textAlign: "left" }} type="paragraph1">
          {data?.settings?.about_author}
        </Typography>
      </Stack>
    </MainWrapper>
  );
};

export default Index;
