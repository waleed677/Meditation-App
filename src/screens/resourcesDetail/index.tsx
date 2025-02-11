import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import Stack from "../../shared/stacks/stack";
import { Dimensions, Image } from "react-native";
import { joinFileLink } from "../../helper/commonFun";
import WebView from "react-native-webview";

const width = Dimensions.get("window").width;

const Index = ({ route }: { route: any }) => {
  return (
    <MainWrapper
      showHeart={true}
      showSearch={false}
      title={route?.params?.data?.title}
      type_of_header="withoutImage"
      fontStyle="normal"
    >
      <Stack flex={1} px={15} gap={18}>
        <Image
          style={{ width: width - 30, borderRadius: 20, height: 250 }}
          source={
            route?.params?.data.image_url
              ? {
                  uri: joinFileLink(route?.params?.data.image_url),
                }
              : require("../../../assets/images/blog-image-detail.png")
          }
          alt=""
        />

        <WebView
          textZoom={200}
          scrollEnabled={true}
          style={{ flex: 1 }}
          originWhitelist={["*"]}
          source={{ html: route?.params?.data?.content }}
        />
      </Stack>
    </MainWrapper>
  );
};

export default Index;
