import React, { ReactNode, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType,
  ActivityIndicator,
} from "react-native";
import BackIcon from "../../../assets/vendors/back-icon";
import { useNavigation } from "@react-navigation/native";
import SearchInput from "../filters/searchInput";
import TopHeaderIcon from "../../../assets/vendors/top-header-icon";
import { useAddFavouritesMutation } from "../../services/favourites";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;

interface MainWrapperProps {
  children: ReactNode;
  showSafeArea?: boolean;
  showSearch?: boolean;
  showHeart?: boolean;
  iconBg?: string;
  title?: string;
  headerImage?: ImageSourcePropType;
  type_of_header?: string;
  fontStyle?: string;
  type_name?: string;
  activity_id?: string;
  icon?: ReactNode;
  setPauseGoBack?: any;
  setSearchQuery?: (query: string) => void;
  checkFav?: boolean;
  setCheckFav?: any;
}

const MainWrapper: React.FC<MainWrapperProps> = ({
  children,
  showSafeArea = false,
  iconBg = "#FF6347",
  icon,
  type_of_header,
  title,
  showSearch = true,
  showHeart = false,
  fontStyle = "italic",
  headerImage = require("../../../assets/images/header_bg/Background_Header_Home.png"),
  setSearchQuery,
  setPauseGoBack,
  type_name,
  activity_id,
  checkFav,
  setCheckFav,
}) => {
  const [authUser, setAuthUser] = useState<any>(null);
  const navigator = useNavigation();
  const [addFavourites, { isLoading, isSuccess, isError, data }] =
    useAddFavouritesMutation();
  const renderHeaderWithImage = (
    <View style={styles.header}>
      <Image style={styles.headerImage} source={headerImage} />
      <View style={styles.headerContent}>
        <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
          {icon}
        </View>
        <Text
          allowFontScaling={false}
          style={[
            styles.headerText,
            {
              color: iconBg,
              fontFamily: "Sansita-BoldItalic",
              textTransform: "capitalize",
            },
          ]}
        >
          {title}
        </Text>
      </View>
    </View>
  );

  const renderHeaderWithOutImage = (
    <SafeAreaView>
      <View
        style={{
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          width: width - 32,
          marginHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (setPauseGoBack) {
              setPauseGoBack(true);
            }
            navigator.goBack();
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <BackIcon />
          <Text allowFontScaling={false}>back</Text>
        </TouchableOpacity>
        <Text
          allowFontScaling={false}
          style={{
            fontWeight: fontStyle === "normal" ? "bold" : undefined,
            fontFamily:
              fontStyle !== "normal" ? "Sansita-BoldItalic" : undefined,
            fontSize: 20,
            marginLeft: 20,
            textTransform: "capitalize",
          }}
        >
          {title?.length > 20 ? title?.slice(0, 20) + "..." : title}
        </Text>
        {showSearch && (
          <SearchInput
            //@ts-ignore
            setSearchQuery={setSearchQuery}
          />
        )}
        {showHeart && (
          <>
            {!isLoading ? (
              <TouchableOpacity
                onPress={async () => {
                  await addFavourites({
                    user_id: authUser?.id,
                    type_name: type_name,
                    activity_id: activity_id,
                  }).unwrap();
                  setCheckFav(!checkFav);
                }}
              >
                <TopHeaderIcon fill={checkFav ? "red" : "none"} />
              </TouchableOpacity>
            ) : (
              <ActivityIndicator size="small" />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
  const checkUser = async () => {
    const userJson = await AsyncStorage.getItem("user");
    const user = userJson != null ? JSON.parse(userJson) : null;
    if (user !== null) {
      setAuthUser(user?.user);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <>
      {showSafeArea ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>{children}</View>
        </SafeAreaView>
      ) : (
        <>
          {type_of_header === "withoutImage"
            ? renderHeaderWithOutImage
            : renderHeaderWithImage}
          <View style={styles.content}>{children}</View>
        </>
      )}
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
  },
  header: {
    position: "relative",
  },
  headerImage: {
    resizeMode: "stretch",
    width: "100%",
    height: 107,
  },
  headerContent: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    top: 30,
    width: "100%",
    gap: 10,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
});

export default MainWrapper;
