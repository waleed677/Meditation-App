import React from "react";
import Stack from "../../shared/stacks/stack";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import BarCard from "../../shared/cards/BarCard";
import ResourcesHeaderIcon from "../../../assets/vendors/resources-header-icon";

const height = Dimensions.get("window").height;
type RootStackParamList = {
  ResourcesList: { data: Record<string, unknown> };
};

const Index: React.FC = () => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <MainWrapper
      iconBg="#655BBA"
      title="Resources"
      icon={<ResourcesHeaderIcon />}
      headerImage={require("../../../assets/images/header_resources.png")}
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
          renderItem={({ item }: { item: any }) => (
            <TouchableOpacity
              onPress={() =>
                navigator.navigate("ResourcesList", {
                  data: { name: "Mindfulness of Body" },
                })
              }
            >
              <BarCard title="Mindfulness of Body" />
            </TouchableOpacity>
          )}
          style={{ marginBottom: 400, height: height - 170 }}
          keyExtractor={(item: any) => item.key}
        />
      </Stack>
    </MainWrapper>
  );
};

export default Index;
