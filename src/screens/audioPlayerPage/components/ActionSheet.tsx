import React from "react";
import {
  Button,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Stack from "../../../shared/stacks/stack";
import Typography from "../../../shared/typography/typography";
import IconButton from "../../../shared/buttons/icon-button";
import Slider from "@react-native-community/slider";

const ActionSheet = ({
  modalVisible,
  setSelectedImages,
  selectImage,
  sound,
  volume,
  setVolume,
}) => {
  const bgImages: any[] = [
    require("../../../../assets/images/bg_audio_1.jpeg"),
    require("../../../../assets/images/bg_audio_2.jpeg"),
    require("../../../../assets/images/bg_audio_3.jpeg"),
    require("../../../../assets/images/bg_audio_4.jpeg"),
    require("../../../../assets/images/bg_audio_5.png"),
  ];

  const bgSong: any[] = ["No Sound", "Raining", "Fire", "Stream", "Nature"];

  const renderImages = () => {
    return bgImages.map((image, index) => {
      if (image !== selectImage) {
        return (
          <Pressable
            key={index}
            style={{ height: 250, width: 150, paddingHorizontal: 5 }}
            onPress={() => {
              setSelectedImages(image);
            }}
          >
            <Image source={image} style={{ height: 250, width: "100%" }} />
          </Pressable>
        );
      }
    });
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Stack px={20}>
            <Stack mt={10} mb={10}>
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
                  onValueChange={async (value) => {
                    setVolume(value);
                    if (sound) {
                      await sound.setVolumeAsync(value); // Update the sound's volume
                    }
                  }}
                  minimumTrackTintColor="#FF913C"
                  maximumTrackTintColor="#FFF9F0"
                  thumbTintColor="#1FB3A0"
                  thumbImage={require("../../../../assets/images/thumbSmallImage.png")}
                />
              </Stack>
              {/* <Typography
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
                {bgSong.map((song, index) => {
                  return (
                    <Pressable
                      key={index}
                      style={{ paddingBottom: 1, marginTop: 5 }}
                    >
                      <Typography
                        type="subtitle2"
                        style={{
                          color: "#FF6A00",
                          borderWidth: 1,
                          borderColor: "#FF6A00",
                          paddingVertical: 5,
                          paddingHorizontal: 8,
                          borderRadius: 5,
                        }}
                      >
                        {song}
                      </Typography>
                    </Pressable>
                  );
                })}
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
            </ScrollView> */}
            </Stack>
            <Stack px={10} mt={10} mb={10}>
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
                  onValueChange={async (value) => {
                    setVolume(value);
                    if (sound) {
                      await sound.setVolumeAsync(value); // Update the sound's volume
                    }
                  }}
                  minimumTrackTintColor="#FF913C"
                  maximumTrackTintColor="#FFF9F0"
                  thumbTintColor="#1FB3A0"
                  thumbImage={require("../../../../assets/images/thumbSmallImage.png")}
                />
              </Stack>
              {/* <Typography
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
                {bgSong.map((song, index) => {
                  return (
                    <Pressable
                      key={index}
                      style={{ paddingBottom: 1, marginTop: 5 }}
                    >
                      <Typography
                        type="subtitle2"
                        style={{
                          color: "#FF6A00",
                          borderWidth: 1,
                          borderColor: "#FF6A00",
                          paddingVertical: 5,
                          paddingHorizontal: 8,
                          borderRadius: 5,
                        }}
                      >
                        {song}
                      </Typography>
                    </Pressable>
                  );
                })}
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
            </ScrollView> */}
            </Stack>
          </Stack>
          <Stack mb={30} style={{ width: "90%", alignSelf: "center" }} mt={10}>
            <IconButton
              text="Sound Control"
              backgroundColor="#2762A6"
              borderRadius={6}
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
    // margin: 20,

    backgroundColor: "white",
    // borderRadius: 20,
    // padding: 35,
    // alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    height: 480,
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
