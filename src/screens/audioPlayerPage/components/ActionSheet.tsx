import React from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Stack from "../../../shared/stacks/stack";
import IconButton from "../../../shared/buttons/icon-button";
import Slider from "@react-native-community/slider";
import Typography from "../../../shared/typography/typography";

interface ActionSheetProps {
  modalVisible: boolean;
  setSelectedImages: (image: any) => void;
  selectImage: any;
  sound: any;
  volume: number;
  setVolume: (value: number) => void;
  setModalVisible: (visible: boolean) => void;
  setBackgroundMusic: (music: any) => void;
  backgroundMusic: any;
  setActionListTab: (tab: number) => void;
  actionListTab: number;
  setBgSound: (sound: any) => void;
  bgSound: any;
  bgVolume: number;
  setBgVolume: (value: number) => void;
}

const ActionSheet: React.FC<ActionSheetProps> = ({
  modalVisible,
  setSelectedImages,
  sound,
  volume,
  setVolume,
  setModalVisible,
  setActionListTab,
  actionListTab,
  bgSound,
  bgVolume,
  setBgVolume,
  selectSoundTab,
  setSelectSoundTab,
  playAudio,
}) => {
  const bgImages = [
    require("../../../../assets/images/bg_audio_1.jpeg"),
    require("../../../../assets/images/bg_audio_2.jpeg"),
    require("../../../../assets/images/bg_audio_3.jpeg"),
    require("../../../../assets/images/bg_audio_4.jpeg"),
    require("../../../../assets/images/bg_audio_5.png"),
  ];

  const bgSong = [
    {
      name: "No Sound",
      value: "no-sound",
    },
    {
      name: "Raining",
      value: "raining",
    },
    {
      name: "Fire",
      value: "fire",
    },
    {
      name: "Stream",
      value: "stream",
    },
    {
      name: "Nature",
      value: "nature",
    },
  ];

  const renderImages = () => {
    return bgImages.map((image, index) => (
      <Pressable
        key={index}
        style={{ height: 250, width: 150, paddingHorizontal: 5 }}
        onPress={() => setSelectedImages(image)}
      >
        <Image source={image} style={{ height: 250, width: "100%" }} />
      </Pressable>
    ));
  };

  const onVolumeChange = (value: number) => {
    setBgVolume(value);
    if (bgSound) {
      bgSound.setVolumeAsync(value);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Stack px={20}>
            <Stack mt={10} mb={10}>
              {actionListTab === 2 && (
                <Stack gap={10}>
                  <Typography
                    type="title2"
                    style={{ color: "#2762A6", textAlign: "center" }}
                  >
                    Ambient Sounds / Images
                  </Typography>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    mt={10}
                  >
                    <Text style={styles.timeText}>Volume</Text>
                    <Slider
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={1}
                      value={volume}
                      onSlidingComplete={(value) => {
                        setVolume(value);
                        if (sound) {
                          sound.setVolumeAsync(value); // Update the sound's volume
                        }
                      }}
                      minimumTrackTintColor="#FF913C"
                      maximumTrackTintColor="#ffffff"
                      thumbImage={require("../../../../assets/images/thumbSmallImage.png")}
                    />
                  </Stack>
                  {selectSoundTab !== "no-sound" && (
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      mt={10}
                    >
                      <Text style={styles.timeText}>Volume</Text>

                      <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        value={bgVolume}
                        onSlidingComplete={onVolumeChange}
                        minimumTrackTintColor="#FF913C"
                        maximumTrackTintColor="#ffffff"
                        thumbImage={require("../../../../assets/images/thumbSmallImage.png")}
                      />
                    </Stack>
                  )}
                </Stack>
              )}
              {actionListTab === 1 && (
                <Stack>
                  <Typography
                    type="title2"
                    style={{ color: "#2762A6", textAlign: "center" }}
                  >
                    Ambient Sounds / Images
                  </Typography>
                  <Typography
                    type="subtitle2"
                    style={{
                      color: "#2762A6",
                      paddingHorizontal: 10,
                      marginVertical: 10,
                    }}
                  >
                    Browse sounds
                  </Typography>
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <Stack
                      display="flex"
                      gap={10}
                      flexDirection="row"
                      px={10}
                      style={{ width: "100%" }}
                    >
                      {bgSong.map((item, index) => (
                        <Pressable
                          key={index}
                          onPress={async () => {
                            if (playAudio) {
                              await bgSound?.playAsync();
                            }
                            setSelectSoundTab(item?.value);
                          }}
                          style={{ paddingBottom: 1, marginTop: 5 }}
                        >
                          <Typography
                            type="subtitle2"
                            style={{
                              color:
                                item?.value === selectSoundTab
                                  ? "#ffffff"
                                  : "#FF6A00",
                              backgroundColor:
                                item?.value === selectSoundTab
                                  ? "#FF6A00"
                                  : "transparent",
                              borderWidth: 1,
                              borderColor: "#FF6A00",
                              paddingVertical: 5,
                              paddingHorizontal: 8,
                              borderRadius: 5,
                            }}
                          >
                            {item?.name}
                          </Typography>
                        </Pressable>
                      ))}
                    </Stack>
                  </ScrollView>
                  <Typography
                    type="subtitle2"
                    style={{
                      color: "#2762A6",
                      paddingHorizontal: 10,
                      marginBottom: 10,
                      marginTop: 20,
                    }}
                  >
                    Browse background images
                  </Typography>
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <Stack
                      display="flex"
                      gap={4}
                      flexDirection="row"
                      px={10}
                      style={{ width: "100%" }}
                    >
                      {renderImages()}
                    </Stack>
                  </ScrollView>
                </Stack>
              )}
            </Stack>
          </Stack>
          <Stack
            gap={10}
            mb={30}
            style={{ width: "90%", alignSelf: "center" }}
            mt={10}
          >
            <IconButton
              text={actionListTab == 1 ? "Sound Control" : "Back"}
              onPress={() => {
                setActionListTab(actionListTab == 1 ? 2 : 1);
              }}
              backgroundColor="#2762A6"
              borderRadius={6}
            />
            <IconButton
              text="Close"
              backgroundColor="#2762A6"
              borderRadius={6}
              onPress={() => setModalVisible(false)}
            />
          </Stack>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#FFDDBD",
    height: 545,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  timeText: {
    fontSize: 12,
    color: "#000000",
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default ActionSheet;
