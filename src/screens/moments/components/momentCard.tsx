import React from "react";
import Stack from "../../../shared/stacks/stack";
import { Dimensions, Image } from "react-native";
import Typography from "../../../shared/typography/typography";

const width = Dimensions.get("window").width;
const MomentCard = ({ data }: { data: any }) => {
  return (
    <Stack py={10}>
      <Stack mb={4} flexDirection="row" justifyContent="space-between">
        <Typography
          style={{ fontStyle: "italic", color: "#8E8E8E" }}
          type="paragraph2"
        >
          Seng Beng
        </Typography>
        <Typography style={{ color: "#8E8E8E" }} type="paragraph2">
          10 minutes ago
        </Typography>
      </Stack>
      <Image
        style={{ height: 440, width: width - 32 }}
        source={require("../../../../assets/images/moment-blog-one.png")}
        alt=""
      />
      <Stack mt={15}>
        <Typography type="paragraph2bold">
          02/10/2024{" "}
          <Typography type="paragraph2">
            Mindfulness is the practice of being fully present and engaged in
            the current moment, without judgment. It involves paying attention
            to your thoughts, feelings, bodily sensations, and surrounding
            environment with openness and curiosity.
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default MomentCard;
