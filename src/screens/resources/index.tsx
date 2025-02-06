import React from "react";
import Stack from "../../shared/stacks/stack";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import BarCard from "../../shared/cards/BarCard";
import ResourcesHeaderIcon from "../../../assets/vendors/resources-header-icon";
import { useGetResourcesQuery } from "../../services/resources";

const height = Dimensions.get("window").height;
type RootStackParamList = {
  ResourcesList: { data: Record<string, unknown> };
};

const Index: React.FC = () => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const { data, isLoading } = useGetResourcesQuery();
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
          data={data?.resources}
          renderItem={({ item }: { item: any }) => (
            <TouchableOpacity
              onPress={() =>
                navigator.navigate("ResourcesList", {
                  data: item,
                })
              }
            >
              <BarCard url={item?.image_url} title={item?.name} />
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
