import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

class Inputs extends Component {
  state = { placeName: "" };

  onChangeHandler = val => {
    this.setState({
      placeName: val
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.placeName}
          onChangeText={this.onChangeHandler}
          style={{ width: "65%" }}
          placeholder="Type an awesome place"
        />
        <Button
          title="Add"
          style={{ marginTop: "10px", width: "30%" }}
          onPress={() => {
            this.setState({ placeName: "" });
            if (this.state.placeName.trim() !== "") {
              this.props.addPlace(this.state.placeName);
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default Inputs;
