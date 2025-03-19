import React from "react";
import Stack from "../../shared/stacks/stack";
import { Image, Text } from "react-native";
import { joinFileLink } from "../../helper/commonFun";

const BarCard = ({ title, url }: { title: string; url: string }) => {
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
        source={
          url
            ? {
                uri: joinFileLink(url),
              }
            : require("../../../assets/images/practice_image.png")
        }
        alt=""
      />
      <Text
        allowFontScaling={false}
        style={{
          fontFamily: "Sansita-BoldItalic",
          fontSize: 19,
          color: "#2762A6",
          textTransform: "capitalize",
        }}
      >
        {title}
      </Text>
    </Stack>
  );
};

export default BarCard;
