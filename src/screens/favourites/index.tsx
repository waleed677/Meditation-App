import React, { useCallback, useState } from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import Stack from "../../shared/stacks/stack";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import ArticleCard from "../../shared/cards/ArticleCard";
import { useGetFavouritesQuery } from "../../services/favourites";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VideoCard from "../../shared/video/VideoCard";
type RootStackParamList = {
  ResourcesDetail: { data: Record<string, unknown> };
  AudioPlayerDetail: { data: Record<string, unknown> };
  VideoPlayerDetail: { data: Record<string, unknown> };
};

type ArticlesProps = {
  source?: string;
  title: string;
  duration: string;
  thumbnail_url: string;
  [key: string]: any;
};

const Index = () => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { data, isLoading, isError, error, refetch } = useGetFavouritesQuery(
    {
      searchQuery: searchQuery,
      userId: authUser?.id,
    },
    { refetchOnMountOrArgChange: true, skip: false, refetchOnFocus: true }
  );

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

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

  const renderCards = (item: {
    source?: string;
    title: string;
    duration: string;
    thumbnail_url: string;
  }) => {
    if (item.source === "audios") {
      return (
        <TouchableOpacity
          onPress={() =>
            navigator.navigate("AudioPlayerDetail", {
              data: { ...item, is_favourite: 1 },
            })
          }
        >
          <VideoCard
            source={require("../../../assets/images/video_box.png")}
            title={item?.title}
            duration={item?.duration}
            thumbnail={item?.thumbnail_url}
            type="audio"
          />
        </TouchableOpacity>
      );
    }
    if (item.source === "videos") {
      return (
        <TouchableOpacity
          onPress={() =>
            navigator.navigate("VideoPlayerDetail", {
              data: { ...item, is_favourite: 1 },
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
      );
    }

    if (item.source === "resource_articles") {
      return (
        <TouchableOpacity
          onPress={() =>
            navigator.navigate("ResourcesDetail", {
              data: { ...item, is_favourite: 1 },
            })
          }
        >
          <ArticleCard
            data={item}
            source={require("../../../assets/images/article_image.png")}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <MainWrapper
      setSearchQuery={setSearchQuery}
      title={"Favorites"}
      type_of_header="withoutImage"
    >
      <Stack px={15} py={14}>
        {!isLoading && (
          <FlatList
            showsVerticalScrollIndicator={false}
            //@ts-ignore
            data={data?.records}
            renderItem={({ item }: { item: ArticlesProps }) => (
              <React.Fragment>{renderCards(item)}</React.Fragment>
            )}
            keyExtractor={(item) => item?.key}
            style={{ marginBottom: 40 }}
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
