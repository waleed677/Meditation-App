import React from "react";
import Stack from "../../shared/stacks/stack";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import MomentTopHeaderIcon from "../../../assets/vendors/moment-top-header-icon";
import MomentCard from "./components/momentCard";

const height = Dimensions.get("window").height;
type RootStackParamList = {
  MomentsDetail: { data: Record<string, unknown> };
};

const Index: React.FC = () => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

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
          data={[
            { key: "1" },
            { key: "2" },
            { key: "3" },
            { key: "4" },
            { key: "5" },
            { key: "6" },
            { key: "7" },
          ]}
          renderItem={({ item }: { item: any }) => <MomentCard />}
          style={{ marginBottom: 400, height: height - 170 }}
          keyExtractor={(item: any) => item.key} // 'item' is typed as 'any'
        />
      </Stack>
    </MainWrapper>
  );
};

export default Index;
