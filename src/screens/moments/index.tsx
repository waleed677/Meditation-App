import React from "react";
import Stack from "../../shared/stacks/stack";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import { ActivityIndicator, Dimensions, FlatList, View } from "react-native";
import MomentTopHeaderIcon from "../../../assets/vendors/moment-top-header-icon";
import MomentCard from "./components/momentCard";
import { useGetMomentQuery } from "../../services/moments";

const height = Dimensions.get("window").height;

const Index: React.FC = () => {
  const { data, isLoading } = useGetMomentQuery();
  return (
    <MainWrapper
      iconBg="#FF913C"
      title="Moments"
      icon={<MomentTopHeaderIcon />}
      headerImage={require("../../../assets/images/header_moments.png")}
    >
      <Stack px={15} mt={9}>
        {!isLoading && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data && data?.moments}
            renderItem={({ item, index }: { item: any; index: number }) => (
              <MomentCard data={item} />
            )}
            style={{ marginBottom: 400, height: height - 170 }}
            keyExtractor={(item, index) => index.toString()} // 'item' is typed as 'any'
          />
        )}
        {isLoading && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#6699FF" />
          </View>
        )}
      </Stack>
    </MainWrapper>
  );
};

export default Index;
