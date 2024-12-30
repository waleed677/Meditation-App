import Typography from "../../shared/typography/typography";
import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import Stack from "../../shared/stacks/stack";
import { Text, TouchableOpacity, View } from "react-native";
import BackIcon from "../../../assets/vendors/back-icon";
import { useNavigation } from "@react-navigation/native";
import OrangeUserIcon from "../../../assets/vendors/orange-user-icon";

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
        <Typography type="paragraph1">Introduction about your app </Typography>
        <Typography style={{ textAlign: "center" }} type="paragraph1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu
          consequat ac felis donec et odio pellentesque diam volutpat. Pharetra
          convallis posuere morbi leo urna. Vitae turpis massa sed elementum
          tempus egestas sed sed risus. Porttitor eget dolor morbi non arcu
          risus quis. Euismod nisi porta lorem mollis aliquam ut. In tellus
          integer feugiat scelerisque.
        </Typography>
        <Typography style={{ textAlign: "center" }} type="paragraph1">
          Tempor nec feugiat nisl pretium fusce id. Maecenas accumsan lacus vel
          facilisis volutpat est velit egestas. Pretium viverra suspendisse
          potenti nullam ac tortor vitae purus. Sagittis nisl rhoncus mattis
          rhoncus urna neque viverra.
        </Typography>
      </Stack>
    </MainWrapper>
  );
};

export default Index;
