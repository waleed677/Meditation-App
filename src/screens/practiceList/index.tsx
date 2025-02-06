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
import { useGetVisualPracticeQuery } from "../../services/visualPractice";

type RootStackParamList = {
  VideoPlayerDetail: { data: Record<string, unknown> };
};

const Index = ({ route }: { route: any }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const { data, isLoading } = useGetVisualPracticeQuery(
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
  console.log("===route.params.data===", route.params.data?.id);
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
            data={data && data?.videos}
            renderItem={({ item }) => (
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
            style={{ marginBottom: 50 }}
            keyExtractor={(item) => item.key}
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
