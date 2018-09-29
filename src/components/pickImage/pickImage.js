import React from "react";
import { View, Image, Button, StyleSheet } from "react-native";

import imagePlaceHolder from "../../assets/beautiful-place.jpg";

const pickImage = props => {
  return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <Image source={imagePlaceHolder} style={styles.previewImage} />
      </View>
      <View style={styles.button}>
        <Button title="Pick Image" onPress={() => alert("Pick Image button")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#ccc",
    width: "80%",
    height: 250
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

export default pickImage;
