import React from "react";
import Stack from "../../shared/stacks/stack";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import SelectHomeIcon from "../../../assets/vendors/select-home-icon";
import Card from "./components/Card";

const Index = () => {
  return (
    <MainWrapper iconBg="#2762A6" icon={<SelectHomeIcon size={17.5} />}>
      <Stack px={15} mt={30}>
        <Stack flexDirection="row" gap={10} mb={10}>
          <Card
            imageLink={require("../../../assets/images/visual-practice-card-home.png")}
            text="Visual Practice"
          />
          <Card
            imageLink={require("../../../assets/images/audio-practice.png")}
            text="Audio Practice"
          />
        </Stack>
        <Stack flexDirection="row" gap={10} mb={10}>
          <Card
            imageLink={require("../../../assets/images/resources-card-home.png")}
            text="Resources"
          />
          <Card
            imageLink={require("../../../assets/images/moment-card-home.png")}
            text="Moments"
          />
        </Stack>
      </Stack>
    </MainWrapper>
  );
};

export default Index;
