import React, { useState } from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import {
  Dimensions,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AudioPlayer from "../../shared/audio/audioPlayer";
import Typography from "../../shared/typography/typography";
import Stack from "../../shared/stacks/stack";
import ActionSheet from "./components/ActionSheet";
import { Audio } from "expo-av";
import SimpleAudioPlayer from "../../shared/audio/simpleAudioPlayer";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackIcon from "../../../assets/vendors/back-icon";
import TopHeaderIcon from "../../../assets/vendors/top-header-icon";

const { height, width } = Dimensions.get("window");

const Index = ({ route }: { route: any }) => {
  const navigator = useNavigation();
  const [volume, setVolume] = useState<number>(1);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [bgSound, setBgSound] = useState<Audio.Sound | null>(null);
  const [bgVolume, setBgVolume] = useState<number>(1);
  const [selectSoundTab, setSelectSoundTab] = useState<string>("no-sound");
  const [modalVisible, setModalVisible] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [pauseGoBack, setPauseGoBack] = useState(false);
  const [actionListTab, setActionListTab] = useState(1);
  const [selectImage, setSelectedImages] = useState(
    require("../../../assets/images/bg_audio_5.png")
  );

  return (
    <>
      <ImageBackground style={{ height, width }} source={selectImage}>
        <View
          style={{
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            width: width - 32,
            marginHorizontal: 16,
            marginTop: Platform.OS === "ios" ? 40 : 30,
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              setPauseGoBack(true);
              navigator.goBack();
              await sound.pauseAsync();
              await bgSound?.pauseAsync();
              await sound?.setPositionAsync(0);
              await bgSound?.setPositionAsync(0);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <BackIcon />
            <Text>back</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "normal",
              fontSize: 20,
              marginLeft: 20,
              textTransform: "capitalize",
            }}
          ></Text>

          <TopHeaderIcon />
        </View>
        <Stack px={15}>
          <Text
            style={{
              fontSize: 20,

              marginBottom: 10,
              fontWeight: "bold",
            }}
          >
            {route.params.data.title}
          </Text>
          <Typography type="caption">
            {route?.params?.data?.description}
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
            pauseGoBack={pauseGoBack}
            setPauseGoBack={setPauseGoBack}
          />
        </Stack>
      </ImageBackground>
      {/* <MainWrapper
        fontStyle="normal"
        title={route?.params?.data?.title}
        showSearch={false}
        showHeart={true}
        type_of_header="withoutImage"
        setPauseGoBack={setPauseGoBack}
      > */}

      {/* </MainWrapper> */}
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
          setPlayAudio={setPlayAudio}
        />
      )}
    </>
  );
};

export default Index;
