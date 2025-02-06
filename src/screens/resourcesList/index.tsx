import React, { useState } from "react";
import MainWrapper from "../../shared/wrappers/main-wrapper";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import Stack from "../../shared/stacks/stack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ArticleCard from "../../shared/cards/ArticleCard";
import { useGetResourcesArticlesQuery } from "../../services/resources";
type RootStackParamList = {
  ResourcesDetail: { data: Record<string, unknown> };
};

type ArticlesProps = {
  title: string;
  duration: string;
  image_url: string;
  [key: string]: any;
};

const Index = ({ route }: { route: any }) => {
  console.log("===route.params.data===", route.params.data?.id);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { data, isLoading } = useGetResourcesArticlesQuery(
    {
      searchQuery: searchQuery,
      id: route.params.data?.id,
    },
    {
      // pollingInterval: 3000,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <MainWrapper
      setSearchQuery={setSearchQuery}
      title={route.params.data.name}
      type_of_header="withoutImage"
    >
      <Stack px={15} py={14}>
        {!isLoading && (
          <FlatList
            showsVerticalScrollIndicator={false}
            //@ts-ignore
            data={data?.resources}
            renderItem={({ item }: { item: ArticlesProps }) => (
              <TouchableOpacity
                onPress={() =>
                  navigator.navigate("ResourcesDetail", {
                    data: item,
                  })
                }
              >
                <ArticleCard
                  type={route.params.data.name}
                  data={item}
                  source={require("../../../assets/images/article_image.png")}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item?.key}
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
