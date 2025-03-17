import React from "react";
import Stack from "../../shared/stacks/stack";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
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
  return (
    <MainWrapper
      iconBg="#209C92"
      title="Practices"
      icon={<PracticeHeaderIcon />}
      headerImage={require("../../../assets/images/header_practice.png")}
    >
      <Stack px={15} mt={9}>
        {!isLoading && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data && data?.practices}
            renderItem={({ item }: { item: any }) => (
              <TouchableOpacity
                onPress={() =>
                  navigator.navigate("PracticeList", {
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
