import React, { useState } from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import { Dimensions, ImageBackground } from "react-native";
import AudioPlayer from "../../shared/audio/audioPlayer";
import Typography from "../../shared/typography/typography";
import Stack from "../../shared/stacks/stack";
import ActionSheet from "./components/ActionSheet";
import { Audio } from "expo-av";
import SimpleAudioPlayer from "../../shared/audio/simpleAudioPlayer";

const { height, width } = Dimensions.get("window");

const Index = ({ route }: { route: any }) => {
  const [volume, setVolume] = useState<number>(1);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [bgSound, setBgSound] = useState<Audio.Sound | null>(null);
  const [bgVolume, setBgVolume] = useState<number>(1);
  const [selectSoundTab, setSelectSoundTab] = useState<string>("no-sound");
  const [modalVisible, setModalVisible] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [actionListTab, setActionListTab] = useState(1);
  const [selectImage, setSelectedImages] = useState(
    require("../../../assets/images/bg_audio_5.png")
  );

  return (
    <>
      <MainWrapper
        fontStyle="normal"
        title={route?.params?.data?.title}
        showSearch={false}
        showHeart={true}
        type_of_header="withoutImage"
      >
        <ImageBackground style={{ height, width }} source={selectImage}>
          <Stack px={15}>
            <Typography type="caption">
              Introduction about the practice session. Summarisation so they
              understand what is it about. Make quick decision if they want to
              play this.
            </Typography>
            <AudioPlayer
              data={route?.params?.data}
              setModalVisible={setModalVisible}
              setVolume={setVolume}
              volume={volume}
              setSound={setSound}
              bgSound={bgSound}
              sound={sound}
              playAudio={playAudio}
              setPlayAudio={setPlayAudio}
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
        setActionListTab={setActionListTab}
        actionListTab={actionListTab}
        setBgSound={setBgSound}
        bgSound={bgSound}
        bgVolume={bgVolume}
        setBgVolume={setBgVolume}
        playAudio={playAudio}
        selectSoundTab={selectSoundTab}
        setSelectSoundTab={setSelectSoundTab}
      />
      {selectSoundTab !== "no-sound" && (
        <SimpleAudioPlayer
          setBgSound={setBgSound}
          bgSound={bgSound}
          bgVolume={bgVolume}
          setBgVolume={setBgVolume}
          playAudio={playAudio}
        />
      )}
    </>
  );
};

export default Index;
