import React from "react";
import Stack from "../../../shared/stacks/stack";
import { Dimensions, Image } from "react-native";
import Typography from "../../../shared/typography/typography";
import { apiUrl } from "../../../constants";

const width = Dimensions.get("window").width;
const MomentCard = ({ data }: { data: any }) => {
  return (
    <Stack py={10}>
      <Stack mb={6} flexDirection="row" justifyContent="space-between">
        <Typography
          style={{
            fontStyle: "italic",
            color: "#8E8E8E",
            fontWeight: "bold",
            fontSize: 13,
            width: width - 120,
          }}
          type="paragraph2"
        >
          {data?.title}
        </Typography>
        <Typography type="caption" style={{ color: "#8E8E8E", fontSize: 10 }}>
          {new Date(data?.created_at).toLocaleTimeString("en-US", {
            timeZone: "Asia/Kuala_Lumpur",
          })}
        </Typography>
      </Stack>
      <Image
        style={{ height: 440, width: width - 32 }}
        // source={require("../../../../assets/images/moment-blog-one.png")}
        source={{ uri: `${apiUrl}/${data?.image_url}` }}
        alt=""
      />
      <Stack mt={15}>
        <Typography type="paragraph2bold">
          {new Date(data?.created_at).toLocaleDateString()}{" "}
          <Typography type="paragraph2">{data?.description}</Typography>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default MomentCard;
