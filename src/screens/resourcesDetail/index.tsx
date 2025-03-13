import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import Stack from "../../shared/stacks/stack";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { joinFileLink } from "../../helper/commonFun";
import Typography from "../../shared/typography/typography";
const width = Dimensions.get("window").width;

const Index = ({ route }: { route: any }) => {
  return (
    <MainWrapper
      showHeart={true}
      showSearch={false}
      type_of_header="withoutImage"
      fontStyle="normal"
    >
      <Stack flex={1} px={15} gap={18}>
        <Text
          style={{
            fontSize: 20,
            marginTop: Platform.OS === "ios" ? -20 : 0,
            fontWeight: "bold",
          }}
        >
          {route?.params?.data?.title}
        </Text>
        <Image
          style={{
            width: width - 30,
            borderRadius: 20,
            height: 250,
          }}
          source={
            route?.params?.data.image_url
              ? {
                  uri: joinFileLink(route?.params?.data.image_url),
                }
              : require("../../../assets/images/blog-image-detail.png")
          }
          alt=""
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Typography style={{ marginTop: 10, fontSize: 15 }} type="paragraph1">
            {route?.params?.data?.content}
          </Typography>
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </Stack>
    </MainWrapper>
  );
};

export default Index;
