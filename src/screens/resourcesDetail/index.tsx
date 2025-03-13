import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import Stack from "../../shared/stacks/stack";
import { Dimensions, Image, Text } from "react-native";
import { joinFileLink } from "../../helper/commonFun";
import QuillEditor from "react-native-cn-quill";
import Typography from "../../shared/typography/typography";
const width = Dimensions.get("window").width;

const Index = ({ route }: { route: any }) => {
  const _editor = React.createRef();

  return (
    <MainWrapper
      showHeart={true}
      showSearch={false}
      type_of_header="withoutImage"
      fontStyle="normal"
    >
      <Stack flex={1} px={15} gap={18}>
        <Text style={{ fontSize: 20, marginTop: -20, fontWeight: "bold" }}>
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
        <QuillEditor
          style={{
            flex: 1,
            backgroundColor: "#FFF9F0",
          }}
          ref={_editor}
          initialHtml={route?.params?.data?.content}
          theme={{ background: "#FFF9F0" }}
          readonly
        />
      </Stack>
    </MainWrapper>
  );
};

export default Index;
