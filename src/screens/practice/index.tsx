import React from "react";
import Stack from "../../shared/stacks/stack";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import PracticeHeaderIcon from "../../../assets/vendors/practice-header-icon";
import BarCard from "../../shared/cards/BarCard";
import { useGetPracticesQuery } from "../../services/practices";

const height = Dimensions.get("window").height;
type RootStackParamList = {
  PracticeList: { data: Record<string, unknown> };
};

const Index: React.FC = () => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const { data, isLoading } = useGetPracticesQuery();
  console.log("data1", data?.practices)
  return (
    <MainWrapper
      iconBg="#209C92"
      title="Practice"
      icon={<PracticeHeaderIcon />}
      headerImage={require("../../../assets/images/header_practice.png")}
    >
      <Stack px={15} mt={9}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data && data?.practices}
          renderItem={({ item }: { item: any }) => (
            <TouchableOpacity
              onPress={() =>
                navigator.navigate("PracticeList", {
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
