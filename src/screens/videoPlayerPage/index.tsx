import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
// import VideoPlayer from "../../shared/video/VideoPlayer";
import Typography from "../../shared/typography/typography";
import Stack from "../../shared/stacks/stack";
// import { IMAGE_BASE_URL } from "../../constants";
import { Text } from "react-native";
import ExpoVideoPlayer from "../../shared/video/ExpoVideoPlayer";

const Index = ({ route }: { route: any }) => {
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
      >
        <Stack px={15} gap={10} mt={-20}>
          {route?.params?.data?.file_url && (
            <ExpoVideoPlayer videoUrl={route?.params?.data?.file_url} />
          )}
          <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "bold" }}>
            {route.params.data.title}
          </Text>
          <Typography type="caption">
            {route?.params?.data?.description}
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
