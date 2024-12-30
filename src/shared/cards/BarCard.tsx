import React from "react";
import Stack from "../../shared/stacks/stack";
import { Image, Text } from "react-native";

const BarCard = ({ title }: { title: string }) => {
  return (
    <Stack
      px={15}
      py={15}
      style={{ backgroundColor: "#FFDDBD", borderRadius: 100 }}
      display="flex"
      flexDirection="row"
      gap={15}
      alignItems="center"
      mb={20}
    >
      <Image
        style={{ borderRadius: 100, width: 58, height: 58 }}
        source={require("../../../assets/images/practice_image.png")}
        alt=""
      />
      <Text
        style={{
          fontStyle: "italic",
          fontWeight: "bold",
          fontSize: 20,
          color: "#2762A6",
        }}
      >
        {title}
      </Text>
    </Stack>
  );
};

export default BarCard;
