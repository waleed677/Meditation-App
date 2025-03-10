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
import { useGetPracticesByIdQuery } from "../../services/practices";

type RootStackParamList = {
  VideoPlayerDetail: { data: Record<string, unknown> };
  AudioPlayerDetail: { data: Record<string, unknown> };
};
type AudioItem = {
  id: number;
  order_number: number;
  practices_id: number;
  title: string;
  duration: string;
  file_url: string;
  thumbnail_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_deleted: number;
  type: string;
};

type VideoItem = {
  id: number;
  order_number: number;
  practices_id: number;
  title: string;
  file_url: string;
  duration: string;
  thumbnail_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_deleted: number;
  type: string;
};

type MediaItem = AudioItem | VideoItem;

const Index = ({ route }: { route: any }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const { data, isLoading, isError, error } = useGetPracticesByIdQuery(
    {
      searchQuery: searchQuery,
      id: route.params.data?.id,
    },
    {
      // pollingInterval: 3000,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  function mergeAndMixArrays(data: {
    audios?: AudioItem[];
    videos?: VideoItem[];
  }): MediaItem[] {
    const audios = data.audios || [];
    const videos = data.videos || [];
    let mergedArray: MediaItem[] = [];

    // Add audio items with type 'audio'
    audios.forEach((item: AudioItem) => {
      const { type, ...rest } = item;
      mergedArray.push({ type: "audio", ...rest });
    });

    // Add video items with type 'video'
    videos.forEach((item: VideoItem) => {
      const { type, ...rest } = item;
      mergedArray.push({ type: "video", ...rest });
    });

    // Shuffle the merged array using Fisher-Yates shuffle
    for (let i = mergedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mergedArray[i], mergedArray[j]] = [mergedArray[j], mergedArray[i]]; // Swap elements
    }

    return mergedArray;
  }

  console.log("===mergeAndMixArrays====", mergeAndMixArrays);

  return (
    <MainWrapper
      setSearchQuery={setSearchQuery}
      title={route.params.data.name}
      type_of_header="withoutImage"
    >
      <Stack px={15} py={14}>
        {!isLoading && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={mergeAndMixArrays(data)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (item?.type === "audio") {
                    navigator.navigate("AudioPlayerDetail", {
                      data: item,
                    });
                  } else {
                    navigator.navigate("VideoPlayerDetail", {
                      data: item,
                    });
                  }
                }}
              >
                <VideoCard
                  source={require("../../../assets/images/video_box.png")}
                  title={item?.title}
                  duration={item?.duration}
                  type={item?.type}
                  thumbnail={item?.thumbnail_url}
                />
              </TouchableOpacity>
            )}
            style={{ marginBottom: 50 }}
            keyExtractor={(item) => item?.id?.toString()}
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
