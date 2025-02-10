import React, { ReactNode } from "react";
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
} from "react-native";
import BackIcon from "../../../assets/vendors/back-icon";
import { useNavigation } from "@react-navigation/native";
import SearchInput from "../filters/searchInput";
import TopHeaderIcon from "../../../assets/vendors/top-header-icon";

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
  icon?: ReactNode;
  setSearchQuery?: (query: string) => void;
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
  headerImage = require("../../../assets/images/header_home.png"),
  setSearchQuery,
}) => {
  const navigator = useNavigation();

  const renderHeaderWithImage = (
    <View style={styles.header}>
      <Image style={styles.headerImage} source={headerImage} />
      <View style={styles.headerContent}>
        <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
          {icon}
        </View>
        <Text
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
          onPress={() => navigator.goBack()}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <BackIcon />
          <Text>back</Text>
        </TouchableOpacity>
        <Text
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
        {showHeart && <TopHeaderIcon />}
      </View>
    </SafeAreaView>
  );

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
