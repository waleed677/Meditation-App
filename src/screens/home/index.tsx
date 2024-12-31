import React, { useState } from "react";
import Stack from "../../shared/stacks/stack";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import SelectHomeIcon from "../../../assets/vendors/select-home-icon";
import Card from "./components/Card";
import { FlatList, TouchableOpacity } from "react-native";
import { timeSlots } from "../../../dummyData";
import Tag from "./components/Tag";
import VideoCard from "../../shared/video/VideoCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
type RootStackParamList = {
  VisualPractice: undefined;
  AudioPractice: undefined;
  Resources: undefined;
  Moments: undefined;
  VideoPlayerDetail: { data: Record<string, unknown> };
};

const Index = () => {
  const [selectSlot, setSelectSlot] = useState("");
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <MainWrapper
      iconBg="#2762A6"
      title="Home"
      icon={<SelectHomeIcon size={17.5} />}
    >
      <Stack px={15} gap={18}>
        <Stack mt={30}>
          <Stack flexDirection="row" gap={10} mb={10}>
            <Card
              onPress={() => navigator.navigate("VisualPractice")}
              imageLink={require("../../../assets/images/visual-practice-card-home.png")}
              text="Visual Practice"
            />
            <Card
              onPress={() => navigator.navigate("AudioPractice")}
              imageLink={require("../../../assets/images/audio-practice.png")}
              text="Audio Practice"
            />
          </Stack>
          <Stack flexDirection="row" gap={10} mb={10}>
            <Card
              onPress={() => navigator.navigate("AudioPractice")}
              imageLink={require("../../../assets/images/resources-card-home.png")}
              text="Resources"
            />
            <Card
              onPress={() => navigator.navigate("Moments")}
              imageLink={require("../../../assets/images/moment-card-home.png")}
              text="Moments"
            />
          </Stack>
        </Stack>
        <FlatList
          data={timeSlots}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectSlot(item?.value)}>
              <Tag
                tagStyle={{
                  backgroundColor:
                    selectSlot == item?.value ? "#6699FF" : "#FFF9F0",
                }}
                tagTextStyle={{
                  color: selectSlot == item?.value ? "#ffffff" : "#6699FF",
                }}
                text={`${item?.min} ${item?.min ? "-" : ">"} ${
                  item.max
                } minutes`}
              />
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </Stack>
      <Stack px={15} mt={9}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[
            { key: "1" },
            { key: "2" },
            { key: "3" },
            { key: "4" },
            { key: "5" },
            { key: "6" },
          ]}
          renderItem={() => (
            <TouchableOpacity
              onPress={() =>
                navigator.navigate("VideoPlayerDetail", {
                  data: { name: "Deep Sleep Exercise" },
                })
              }
            >
              <VideoCard
                source={require("../../../assets/images/video_box.png")}
              />
            </TouchableOpacity>
          )}
          style={{ marginBottom: 400 }}
          keyExtractor={(item) => item.key}
        />
      </Stack>
    </MainWrapper>
  );
};

export default Index;
