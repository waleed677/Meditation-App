import Typography from "../../shared/typography/typography";
import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import Stack from "../../shared/stacks/stack";
import { Text, TouchableOpacity, View } from "react-native";
import BackIcon from "../../../assets/vendors/back-icon";
import { useNavigation } from "@react-navigation/native";
import BlueBgUserIcon from "../../../assets/vendors/blue-bg-user-icon";

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
          About Dr. Seng Beng
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
          Dr. Tan Seng Beng
        </Typography>
        <Typography style={{ textAlign: "left" }} type="paragraph1">
          Introduction about you, your practices, your expertises, and how the
          app will benefit the users.
        </Typography>
        <Typography type="paragraph1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu
          consequat ac felis donec et odio pellentesque diam volutpat. Pharetra
          convallis posuere morbi leo urna. Vitae turpis massa sed elementum
          tempus egestas sed sed risus. Porttitor eget dolor morbi non arcu
          risus quis. Euismod nisi porta lorem mollis aliquam ut. In tellus
          integer feugiat scelerisque.
        </Typography>
        <Typography type="paragraph1">
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
