import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "./ListItem/ListItem";

const listItems = props => {
  return (
    <FlatList
      data={props.places}
      renderItem={info => (
        <ListItem
          placeImage={info.item.image}
          placeName={info.item.name}
          onItemPress={() => props.itemSelect(info.item.key)}
        />
      )}
      style={styles.entry}
    />
  );
};

const styles = StyleSheet.create({
  entry: {
    width: "90%",
    alignSelf: "center"
  }
});

export default listItems;
