import React, { useState } from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import { Button, Dimensions, ImageBackground } from "react-native";
import AudioPlayer from "../../shared/audio/audioPlayer";
import Typography from "../../shared/typography/typography";
import Stack from "../../shared/stacks/stack";
import { joinFileLink } from "../../helper/commonFun";
import ActionSheet from "./components/ActionSheet";
import { Audio } from "expo-av";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Index = ({ route }: { route: any }) => {
  const [volume, setVolume] = useState<number>(1);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [backgroundVolume, setBackgroundVolume] = useState<number>(1);
  const [backgroundSound, setBackgroundSound] = useState<Audio.Sound | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectImage, setSelectedImages] = useState(
    require("../../../assets/images/bg_audio_5.png")
  );
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
          source={selectImage}
        >
          <Stack px={15}>
            <Typography type="caption">
              {route?.params?.data?.description}
            </Typography>
            <AudioPlayer
              data={route?.params?.data}
              setModalVisible={setModalVisible}
              setVolume={setVolume}
              volume={volume}
              setSound={setSound}
              sound={sound}
              setBackgroundSound={setBackgroundSound}
              backgroundSound={backgroundSound}
              setBackgroundVolume={setBackgroundVolume}
              backgroundVolume={backgroundVolume}
            />
          </Stack>
        </ImageBackground>
      </MainWrapper>
      <ActionSheet
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setSelectedImages={setSelectedImages}
        selectImage={selectImage}
        setSound={setSound}
        sound={sound}
        volume={volume}
        setVolume={setVolume}
        backgroundSound={backgroundSound}
        setBackgroundVolume={setBackgroundVolume}
        backgroundVolume={backgroundVolume}
      />
    </React.Fragment>
  );
};

export default Index;
