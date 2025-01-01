import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import SearchIcon from "../../../assets/vendors/search-icon";

const SearchInput = () => {
  const [text, onChangeText] = React.useState("");
  return (
    <View style={styles.input_container}>
      <TextInput
        placeholder="Search"
        style={styles.input}
        onChangeText={onChangeText}
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
    // lineHeight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
export default SearchInput;
