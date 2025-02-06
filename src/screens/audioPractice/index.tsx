import React, { useState } from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import VideoCard from "../../shared/video/VideoCard";
import Stack from "../../shared/stacks/stack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useGetAudioPracticeQuery } from "../../services/audioPractice";
type RootStackParamList = {
  AudioPlayerDetail: { data: Record<string, unknown> };
};

const Index = () => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const { data, isLoading } = useGetAudioPracticeQuery();

  return (
    <MainWrapper
      setSearchQuery={setSearchQuery}
      title="Audio Practice"
      type_of_header="withoutImage"
    >
      <Stack px={15} py={14}>
        {!isLoading && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data?.audios}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigator.navigate("AudioPlayerDetail", {
                    data: item,
                  })
                }
              >
                <VideoCard
                  source={require("../../../assets/images/video_box.png")}
                  title={item?.title}
                  duration={item?.duration}
                  thumbnail={item?.thumbnail_url}
                />
              </TouchableOpacity>
            )}
            style={{ marginBottom: 50 }}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        {isLoading && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#6699FF" />
          </View>
        )}
      </Stack>
    </MainWrapper>
  );
};

export default Index;
