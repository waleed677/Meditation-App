import React, { useCallback, useEffect, useState } from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import BackIcon from "../../../assets/vendors/back-icon";
import TopHeaderIcon from "../../../assets/vendors/top-header-icon";
import {
  useAddFavouritesMutation,
  useGetFavouritesQuery,
} from "../../services/favourites";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

const Index = ({ route }: { route: any }) => {
  const navigator = useNavigation();
  const [checkFav, setCheckFav] = useState(false);
  const [authUser, setAuthUser] = useState<any>(null);
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
    require("../../../assets/images/audio_bg/bg_1.jpg")
  );
  const [addFavourites, { isLoading }] = useAddFavouritesMutation();
  const {
    data: getFavourites,
    refetch,
    isFetching,
  } = useGetFavouritesQuery(
    {
      userId: authUser?.id,
      activityId: route?.params?.data?.id,
      typeName: "audio",
    },
    { refetchOnMountOrArgChange: true, skip: false, refetchOnFocus: true }
  );
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setPauseGoBack(true);
        return true; // Prevents the default back action
      }
    );

    // Cleanup the event listener when the component unmounts
    return () => backHandler.remove();
  }, [navigator]);

  const checkUser = async () => {
    const userJson = await AsyncStorage.getItem("user");
    const user = userJson != null ? JSON.parse(userJson) : null;
    if (user !== null) {
      setAuthUser(user?.user);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkUser();
      refetch();
    }, [])
  );
  useEffect(() => {
    if (getFavourites?.total_records == 1) {
      setCheckFav(true);
    }
  }, [getFavourites?.total_records]);

  return (
    <>
      <ImageBackground
        style={{ height: height + 50, width }}
        source={selectImage}
      >
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
            onPress={() => {
              setPauseGoBack(true);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <BackIcon />
            <Text allowFontScaling={false}>back</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "normal",
              fontSize: 20,
              marginLeft: 20,
              textTransform: "capitalize",
            }}
          ></Text>
          {!isFetching ? (
            <>
              {!isLoading ? (
                <TouchableOpacity
                  onPress={async () => {
                    await addFavourites({
                      user_id: authUser?.id,
                      type_name: "audio",
                      activity_id: route?.params?.data?.id,
                    }).unwrap();
                    setCheckFav(!checkFav);
                  }}
                >
                  <TopHeaderIcon fill={checkFav ? "red" : "none"} />
                </TouchableOpacity>
              ) : (
                <ActivityIndicator size="small" />
              )}
            </>
          ) : (
            <ActivityIndicator size="small" />
          )}
        </View>
        <Stack px={15}>
          <Text
            allowFontScaling={false}
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
            navigator={navigator}
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
          selectSoundTab={selectSoundTab}
        />
      )}
    </>
  );
};

export default Index;
