import React, { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Image, Text } from "react-native";

interface MainWrapperProps {
  children: ReactNode;
  showSafeArea?: boolean;
  iconBg?: string;
  icon?: ReactNode;
}

const MainWrapper: React.FC<MainWrapperProps> = ({
  children,
  showSafeArea = false,
  iconBg = "#FF6347", // Default iconBg color
  icon,
}) => {
  const renderHeader = (
    <View style={styles.header}>
      <Image
        style={styles.headerImage}
        source={require("../../../assets/images/home-top-header.png")}
      />
      <View style={styles.headerContent}>
        <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
          {icon}
        </View>
        <Text style={[styles.headerText, { color: iconBg }]}>Home</Text>
      </View>
    </View>
  );

  return (
    <>
      {showSafeArea ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>{children}</View>
        </SafeAreaView>
      ) : (
        <>
          {renderHeader}
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
    height: 130,
  },
  headerContent: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
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
    fontStyle: "italic",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
});

export default MainWrapper;
