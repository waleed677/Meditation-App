import React, { useCallback, useEffect, useState } from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import Stack from "../../shared/stacks/stack";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { joinFileLink } from "../../helper/commonFun";
import Typography from "../../shared/typography/typography";
import { useFocusEffect } from "@react-navigation/native";
import { useGetFavouritesQuery } from "../../services/favourites";
import AsyncStorage from "@react-native-async-storage/async-storage";
const width = Dimensions.get("window").width;

const Index = ({ route }: { route: any }) => {
  const [authUser, setAuthUser] = useState<any>(null);
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetFavouritesQuery(
      {
        userId: authUser?.id,
        activityId: route?.params?.data?.id,
        typeName: "article",
      },
      { refetchOnMountOrArgChange: true, skip: false, refetchOnFocus: true }
    );
  const [checkFav, setCheckFav] = useState(false);

  const checkUser = async () => {
    const userJson = await AsyncStorage.getItem("user");
    const user = userJson != null ? JSON.parse(userJson) : null;
    if (user !== null) {
      setAuthUser(user?.user);
    }
  };
  useFocusEffect(
    useCallback(() => {
      checkUser();
      refetch();
    }, [])
  );
  useEffect(() => {
    if (data?.total_records == 1) {
      setCheckFav(true);
    }
  }, [data?.total_records]);

  return (
    <MainWrapper
      showHeart={true}
      showSearch={false}
      type_of_header="withoutImage"
      fontStyle="normal"
      activity_id={route?.params?.data?.id}
      type_name="article"
      setCheckFav={setCheckFav}
      checkFav={checkFav}
      favIconLoading={isFetching}
    >
      <Stack flex={1} px={15} gap={18}>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 20,
            marginTop: Platform.OS === "ios" ? -20 : 0,
            fontWeight: "bold",
          }}
        >
          {route?.params?.data?.title}
        </Text>
        <Image
          style={{
            width: width - 30,
            borderRadius: 20,
            height: 250,
          }}
          source={
            route?.params?.data.image_url || route?.params?.data.duration
              ? {
                  uri: route?.params?.data.image_url
                    ? joinFileLink(route?.params?.data.image_url)
                    : joinFileLink(route?.params?.data.duration),
                }
              : require("../../../assets/images/blog-image-detail.png")
          }
          alt=""
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Typography style={{ marginTop: 10, fontSize: 15 }} type="paragraph1">
            {route?.params?.data?.content || route?.params?.data?.file_url}
          </Typography>
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </Stack>
    </MainWrapper>
  );
};

export default Index;
