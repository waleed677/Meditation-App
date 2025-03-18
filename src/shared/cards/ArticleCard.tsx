import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Typography from "../typography/typography";
import Stack from "../stacks/stack";
import ArticleIcon from "../../../assets/vendors/article_icon";
import { joinFileLink } from "../../helper/commonFun";
const width = Dimensions.get("window").width;
const ArticleCard = ({
  source,
  data,
  type,
}: {
  source: number;
  data: any;
  type?: string;
}) => {
  return (
    <View style={style.container}>
      <View style={style.card_img_wrapper}>
        <Image
          style={style.card_bg}
          source={
            data?.image_url || data?.duration
              ? {
                  uri: data?.image_url
                    ? joinFileLink(data?.image_url)
                    : joinFileLink(data?.duration),
                }
              : source
          }
          alt="bg-image"
        />
      </View>
      <Stack gap={2}>
        {type && (
          <Typography
            type="caption"
            style={{ color: "#2762A6", textTransform: "capitalize" }}
          >
            {type}
          </Typography>
        )}
        <Typography type="subtitle3" style={{ color: "#2762A6" }}>
          {data?.title}
        </Typography>
      </Stack>
      <Stack mt={5} flexDirection="row" gap={4}>
        <ArticleIcon />
        {/* <Typography type="caption" style={{ color: "#FF6A00" }}>
          {data.duration || "00:00"}
        </Typography> */}
      </Stack>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: width - 30,
    marginBottom: 15,
  },
  card_img_wrapper: {
    width: width - 32,
    height: 215,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 8,
  },
  card_bg: {
    width: width - 32,
    height: 215,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "#00000020",
  },
  box_layer: {
    backgroundColor: "#00000020",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 215,
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default ArticleCard;
