import React, { FC, useState } from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";
import SearchIcon from "../../../assets/vendors/search-icon";

interface SearchInputProps {
  setSearchQuery: (query: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ setSearchQuery }) => {
  const [text, onChangeText] = useState<string>("");

  return (
    <View style={styles.input_container}>
      <TextInput
        allowFontScaling={false}
        placeholder="Search"
        style={styles.input}
        onChangeText={(text) => {
          if (setSearchQuery) {
            setSearchQuery(text);
          }
          onChangeText(text);
        }}
        value={text}
      />
      <SearchIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  input_container: {
    backgroundColor: "#D7EEFF",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 3,
  },
  input: {
    width: 60,
    height: 30,
    color: "#2762A6",
    fontSize: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default SearchInput;
