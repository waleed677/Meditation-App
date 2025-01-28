import React, { useEffect, useState } from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import VideoPlayer from "../../shared/video/VideoPlayer";
import Typography from "../../shared/typography/typography";
import Stack from "../../shared/stacks/stack";

const Index = ({ route }: { route: any }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState({});

  useEffect(() => {
    // Simulate fetching lessons by course
    const fakeLessons = [
      {
        lessonId: "1",
        lessonVideoUrl: "https://example.com/video1.mp4",
        lessonTitle: "Lesson 1",
        lessonDescription: "Introduction to React Native 1",
        videoTotalDuration: "600",
        lessonThumbnailImageUrl: "https://example.com/thumbnail1.jpg",
      },
      {
        lessonId: "2",
        lessonVideoUrl: "https://example.com/video2.mp4",
        lessonTitle: "Lesson 2",
        lessonDescription: "Introduction to React Native 2",
        videoTotalDuration: "800",
        lessonThumbnailImageUrl: "https://example.com/thumbnail2.jpg",
      },
      // Add more lessons here
    ];
    setLessons(fakeLessons);
    setSelectedLesson(fakeLessons[0]);
  }, []);
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
              Introduction about the practice session. Summarisation so they
              understand what is it about. Make quick decision if they want to
              play this.
            </Typography>
            <VideoPlayer
              setIsFullscreen={setIsFullscreen}
              isFullscreen={isFullscreen}
              setCurrentTime={setCurrentTime}
              currentTime={currentTime}
              lessons={lessons}
              selectedLesson={selectedLesson}
              data={route.params.data}
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
        />
      )}
    </React.Fragment>
  );
};

export default Index;
