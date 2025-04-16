import React, { useCallback, useEffect, useState } from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
// import VideoPlayer from "../../shared/video/VideoPlayer";
import Typography from "../../shared/typography/typography";
import Stack from "../../shared/stacks/stack";
// import { IMAGE_BASE_URL } from "../../constants";
import { Platform, Text } from "react-native";
import ExpoVideoPlayer from "../../shared/video/ExpoVideoPlayer";
import { useGetFavouritesQuery } from "../../services/favourites";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = ({ route }: { route: any }) => {
  const [authUser, setAuthUser] = useState<any>(null);
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetFavouritesQuery(
      {
        userId: authUser?.id,
        activityId: route?.params?.data?.id,
        typeName: "video",
      },
      { refetchOnMountOrArgChange: true, skip: false, refetchOnFocus: true }
    );
  const [checkFav, setCheckFav] = useState(false);

  const checkUser = async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson != null ? JSON.parse(userJson) : null;
      if (user) {
        setAuthUser(user?.user);
      }
    } catch (error) {
      console.error("Failed to fetch user from AsyncStorage", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkUser();
      setCheckFav(false); // Reset checkFav when page is focused
      refetch(); // Refetch the data whenever the page is focused
    }, [route])
  );

  useEffect(() => {
    if (data?.total_records === 1) {
      setCheckFav(true);
    } else {
      setCheckFav(false);
    }
  }, [data?.total_records]);
  console.log("=====isFetching====", isFetching);
  // const [isFullscreen, setIsFullscreen] = useState(false);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [lessons, setLessons] = useState([]);
  // const [selectedLesson, setSelectedLesson] = useState({});
  // const [isLooping, setIsLooping] = useState(false);
  // const convertTimeToSeconds = (time: string) => {
  //   let [minutes, seconds] = time.split(":").map(Number);
  //   return minutes * 60 + seconds;
  // };
  // useEffect(() => {
  //   // Simulate fetching lessons by course
  //   const fakeLessons = [
  //     {
  //       lessonId: "1",
  //       lessonVideoUrl: "https://example.com/video1.mp4",
  //       lessonTitle: "Lesson 1",
  //       lessonDescription: "Introduction to React Native 1",
  //       videoTotalDuration: convertTimeToSeconds(route?.params?.data?.duration),
  //       lessonThumbnailImageUrl: "https://example.com/thumbnail1.jpg",
  //     },

  //     // Add more lessons here
  //   ];
  //   setLessons(fakeLessons);
  //   setSelectedLesson(fakeLessons[0]);
  // }, [route?.params?.data?.duration]);
  return (
    <React.Fragment>
      <MainWrapper
        fontStyle="normal"
        title={""}
        showSearch={false}
        showHeart={true}
        type_of_header="withoutImage"
        type_name="video"
        activity_id={route?.params?.data?.id}
        setCheckFav={setCheckFav}
        checkFav={checkFav}
        favIconLoading={isFetching}
      >
        <Stack px={15} gap={10} mt={Platform.OS === "ios" ? -24 : 10}>
          {route?.params?.data?.file_url && (
            <ExpoVideoPlayer
              thumbnail_url={route?.params?.data?.thumbnail_url}
              videoUrl={route?.params?.data?.file_url}
            />
          )}
          <Text
            allowFontScaling={false}
            style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}
          >
            {route.params.data.title}
          </Text>
          <Typography type="caption">
            {route?.params?.data?.description != "undefined"
              ? route?.params?.data?.description
              : ""}
          </Typography>
        </Stack>
      </MainWrapper>

      {/* {isFullscreen && (
        <VideoPlayer
          setIsFullscreen={setIsFullscreen}
          isFullscreen={isFullscreen}
          setCurrentTime={setCurrentTime}
          currentTime={currentTime}
          lessons={lessons}
          selectedLesson={selectedLesson}
          videoSource={`${IMAGE_BASE_URL}${route?.params?.data?.file_url}`}
          setIsLooping={setIsLooping}
          isLooping={isLooping}
        />
      )} */}
    </React.Fragment>
  );
};

export default Index;
