import React, { Component } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import ImagePicker from "react-native-image-picker";

class PickImage extends Component {
  componentWillMount() {
    this.reset();
  }

  reset = () => {
    this.setState({
      placeImage: null
    });
  };

  PickImageHandler = () => {
    ImagePicker.showImagePicker(
      { title: "Pick an image", maxHeight: 500, maxWidth: 700 },
      res => {
        if (res.didCancel) {
          console.log("User cancelled");
        } else if (res.error) {
          console.log("Error: ", res.error);
        } else {
          this.setState({
            placeImage: { uri: res.uri }
          });
          this.props.pickImageHandler({ uri: res.uri, base64: res.data });
        }
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.placeImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.PickImageHandler} />
        </View>
      </View>
    );
  }
}

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

export default PickImage;
