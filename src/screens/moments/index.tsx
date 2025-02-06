import React from "react";
import Stack from "../../shared/stacks/stack";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import { Dimensions, FlatList } from "react-native";
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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data && data?.moments}
          renderItem={({ item, index }: { item: any; index: number }) => (
            <MomentCard data={item} />
          )}
          style={{ marginBottom: 400, height: height - 170 }}
          keyExtractor={(item, index) => index.toString()} // 'item' is typed as 'any'
        />
      </Stack>
    </MainWrapper>
  );
};

export default Index;
