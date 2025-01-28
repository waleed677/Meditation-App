import React from "react";
import Stack from "../../shared/stacks/stack";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import MomentTopHeaderIcon from "../../../assets/vendors/moment-top-header-icon";
import MomentCard from "./components/momentCard";
import { useGetMomentQuery } from "../../services/moments";

const height = Dimensions.get("window").height;
type RootStackParamList = {
  MomentsDetail: { data: Record<string, unknown> };
};

const Index: React.FC = () => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const { data, isLoading } = useGetMomentQuery();
  console.log(data)
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
          renderItem={({ item, index }: { item: any, index: number }) => <MomentCard data={item} />}
          style={{ marginBottom: 400, height: height - 170 }}
          keyExtractor={(item, index) => index.toString()} // 'item' is typed as 'any'
        />
      </Stack>
    </MainWrapper>
  );
};

export default Index;
