import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const listItem = props => (
  <TouchableOpacity onPress={props.onItemPress}>
    <View style={styles.listItem}>
      <Image source={props.placeImage} style={styles.listImage} />
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    backgroundColor: "#eee",
    marginBottom: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  listImage: {
    width: 30,
    height: 30,
    marginRight: 8
  }
});

export default listItem;
