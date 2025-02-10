import React, { useEffect, useState } from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import VideoPlayer from "../../shared/video/VideoPlayer";
import Typography from "../../shared/typography/typography";
import Stack from "../../shared/stacks/stack";
import { IMAGE_BASE_URL } from "../../constants";

const Index = ({ route }: { route: any }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState({});
  const [isLooping, setIsLooping] = useState(false);
  const convertTimeToSeconds = (time: string) => {
    let [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + seconds;
  };
  useEffect(() => {
    // Simulate fetching lessons by course
    const fakeLessons = [
      {
        lessonId: "1",
        lessonVideoUrl: "https://example.com/video1.mp4",
        lessonTitle: "Lesson 1",
        lessonDescription: "Introduction to React Native 1",
        videoTotalDuration: convertTimeToSeconds(route?.params?.data?.duration),
        lessonThumbnailImageUrl: "https://example.com/thumbnail1.jpg",
      },

      // Add more lessons here
    ];
    setLessons(fakeLessons);
    setSelectedLesson(fakeLessons[0]);
  }, [route?.params?.data?.duration]);
  return (
    <React.Fragment>
      {!isFullscreen && (
        <MainWrapper
          fontStyle="normal"
          title={route.params.data.title}
          showSearch={false}
          showHeart={true}
          type_of_header="withoutImage"
        >
          <Stack px={15} gap={10}>
            <Typography type="caption">
              {route?.params?.data?.description}
            </Typography>
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
          </Stack>
        </MainWrapper>
      )}
      {isFullscreen && (
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
      )}
    </React.Fragment>
  );
};

export default Index;
