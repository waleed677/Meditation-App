import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import VideoPlayer from "../../shared/video/VideoPlayer";
import Typography from "../../shared/typography/typography";
import Stack from "../../shared/stacks/stack";

const Index = ({ route }: { route: any }) => {
  return (
    <MainWrapper
      fontStyle="normal"
      title={route?.params?.data?.title}
      showSearch={false}
      showHeart={true}
      type_of_header="withoutImage"
    >
      <Stack px={15} gap={10}>
        <Typography type="caption">
          Introduction about the practice session. Summarisation so they
          understand what is it about. Make quick decision if they want to play
          this.
        </Typography>
        <VideoPlayer data={route?.params?.data} />
      </Stack>
    </MainWrapper>
  );
};

export default Index;
