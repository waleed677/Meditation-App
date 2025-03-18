import Typography from "../../shared/typography/typography";
import React from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import Stack from "../../shared/stacks/stack";
import IconButton from "../../shared/buttons/icon-button";
import UserAccountIcon from "../../../assets/vendors/user-account-icon";
import AboutIconApp from "../../../assets/vendors/about-the-app-icon";
import DiamondUserIcon from "../../../assets/vendors/diamond-user-icon";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import FavIcon from "../../../assets/vendors/fav-icon";
type RootStackParamList = {
  AboutApp: undefined;
  AboutAuthor: undefined;
  Account: undefined;
  Favorites: undefined;
};
const Index = () => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <MainWrapper showSafeArea={true}>
      <Typography
        style={{
          textAlign: "center",
          fontFamily: "Sansita-BoldItalic",
          fontSize: 20,
        }}
        type="none"
      >
        Setting
      </Typography>
      <Stack gap={8} px={15} mt={36}>
        <IconButton
          onPress={() => navigator.navigate("Account")}
          style={{
            justifyContent: "flex-start",
            paddingHorizontal: 24,
            height: 50,
          }}
          backgroundColor="#FF913C"
          text="My Account"
          leftIcon={<UserAccountIcon />}
        />
        <IconButton
          onPress={() => navigator.navigate("AboutApp")}
          style={{
            justifyContent: "flex-start",
            paddingHorizontal: 24,
            height: 50,
          }}
          backgroundColor="#FFA864"
          text="About The App"
          leftIcon={<AboutIconApp />}
        />
        <IconButton
          onPress={() => navigator.navigate("Favorites")}
          style={{
            justifyContent: "flex-start",
            paddingHorizontal: 24,
            height: 50,
          }}
          backgroundColor="#FFA864"
          text="My Favourites"
          leftIcon={<FavIcon />}
        />
        <IconButton
          onPress={() => navigator.navigate("AboutAuthor")}
          style={{
            justifyContent: "flex-start",
            paddingHorizontal: 24,
            height: 50,
          }}
          backgroundColor="#FFA864"
          text="About The Author"
          leftIcon={<DiamondUserIcon />}
        />
      </Stack>
    </MainWrapper>
  );
};

export default Index;
