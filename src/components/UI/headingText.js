import React from "react";
import { Text, StyleSheet } from "react-native";

const headingText = props => {
  return <Text style={styles.heading}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    paddingBottom: 15,
    color: "black"
  }
});

export default headingText;
