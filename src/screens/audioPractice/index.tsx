import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import { FlatList, TouchableOpacity } from "react-native";
import VideoCard from "../../shared/video/VideoCard";
import Stack from "../../shared/stacks/stack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
type RootStackParamList = {
  AudioPlayerDetail: { data: Record<string, unknown> };
};

const Index = () => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <MainWrapper title="Audio Practice" type_of_header="withoutImage">
      <Stack px={15} py={14}>
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
                navigator.navigate("AudioPlayerDetail", {
                  data: { name: "Deep Sleep Exercise" },
                })
              }
            >
              <VideoCard
                source={require("../../../assets/images/video_box.png")}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
      </Stack>
    </MainWrapper>
  );
};

export default Index;
