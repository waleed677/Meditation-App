import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import { FlatList } from "react-native";
import VideoCard from "../../shared/video/VideoCard";
import Stack from "../../shared/stacks/stack";

const Index = ({ route }: { route: any }) => {
  return (
    <MainWrapper title={route.params.data.name} type_of_header="withoutImage">
      <Stack px={15} py={14}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[
            { key: "1" },
            { key: "2" },
            { key: "3" },
            { key: "4" },
            { key: "5" },
            { key: "6" },
          ]}
          renderItem={() => (
            <VideoCard
              source={require("../../../assets/images/video_box.png")}
            />
          )}
          keyExtractor={(item) => item.key}
        />
      </Stack>
    </MainWrapper>
  );
};

export default Index;
