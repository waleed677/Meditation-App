import React, { useEffect, useState } from "react";
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
import { useGetVisualPracticeQuery } from "../../services/visualPractice";

type RootStackParamList = {
  VideoPlayerDetail: { data: Record<string, unknown> };
};

type Video = {
  title: string;
  duration: string;
  [key: string]: any;
};

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const { data, isLoading } = useGetVisualPracticeQuery(
    {
      searchQuery: searchQuery,
    },
    {
      // pollingInterval: 3000,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  return (
    <MainWrapper
      setSearchQuery={setSearchQuery}
      title="Visual Practices"
      type_of_header="withoutImage"
    >
      <Stack px={15} py={14}>
        {!isLoading && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data?.videos}
            renderItem={({ item }: { item: Video }) => (
              <TouchableOpacity
                onPress={() =>
                  navigator.navigate("VideoPlayerDetail", {
                    data: item,
                  })
                }
              >
                <VideoCard
                  source={require("../../../assets/images/video_box.png")}
                  title={item.title}
                  duration={item.duration}
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
