import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import { FlatList, TouchableOpacity } from "react-native";
import VideoCard from "../../shared/video/VideoCard";
import Stack from "../../shared/stacks/stack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useGetMomentQuery } from "../../services/moments";
import { useGetVisualPracticeQuery } from "../../services/visualPractice";
type RootStackParamList = {
  VideoPlayerDetail: { data: Record<string, unknown> };
};
const Index = () => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const { data, isLoading } = useGetVisualPracticeQuery();
  console.log("data::", data?.videos)
  return (
    <MainWrapper title="Visual Practice" type_of_header="withoutImage">
      <Stack px={15} py={14}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data && data?.videos}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                navigator.navigate("VideoPlayerDetail", {
                  data: item,
                })
              }
            >
              <VideoCard
                source={require("../../../assets/images/video_box.png")}
                title={item?.title}
                duration={item?.duration}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Stack>
    </MainWrapper>
  );
};

export default Index;
