import React, { useState } from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import { Button, Dimensions, ImageBackground } from "react-native";
import AudioPlayer from "../../shared/audio/audioPlayer";
import Typography from "../../shared/typography/typography";
import Stack from "../../shared/stacks/stack";
import { joinFileLink } from "../../helper/commonFun";
import ActionSheet from "./components/ActionSheet";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Index = ({ route }: { route: any }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const bgImages: any[] = [
    require("../../../assets/images/bg_audio_1.jpeg"),
    require("../../../assets/images/bg_audio_2.jpeg"),
    require("../../../assets/images/bg_audio_3.jpeg"),
    require("../../../assets/images/bg_audio_4.jpeg"),
    require("../../../assets/images/bg_audio_5.png"),
  ];
  const [selectImage, setSelectedImages] = useState(null);
  return (
    <React.Fragment>
      <MainWrapper
        fontStyle="normal"
        title={route?.params?.data?.title}
        showSearch={false}
        showHeart={true}
        type_of_header="withoutImage"
      >
        <ImageBackground
          style={{ height: height, width: width }}
          source={
            route?.params?.data?.thumbnail_url
              ? { uri: joinFileLink(route?.params?.data?.thumbnail_url) }
              : require("../../../assets/images/audio_bg.png")
          }
        >
          <Stack px={15}>
            <Typography type="caption">
              Introduction about the practice session. Summarisation so they
              understand what is it about. Make quick decision if they want to
              play this.
            </Typography>
            <AudioPlayer data={route?.params?.data} />
          </Stack>
        </ImageBackground>
      </MainWrapper>
      <ActionSheet
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </React.Fragment>
  );
};

export default Index;
