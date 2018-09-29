import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";

class DefaultInput extends Component {
  render() {
    return (
      <TextInput
        style={[styles.defInput, this.props.style]}
        {...this.props}
        value={this.props.value}
        onChangeText={this.props.changeTextHandler}
      />
    );
  }
}

const styles = StyleSheet.create({
  defInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
    margin: 8,
    padding: 5
  }
});

export default DefaultInput;
