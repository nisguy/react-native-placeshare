import React, { Component } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";

import { addPlace } from "../../store/actions/index";
import PickImage from "../../components/pickImage/pickImage";
import PickLocation from "../../components/pickLocation/pickLocation";
import Defaultinput from "../../components/UI/defaultInputs";

class SharePlaceScreen extends Component {
  state = {
    placeName: "",
    location: {
      value: null,
      valid: false
    }
  };

  changeTextHandler = val => {
    this.setState({
      placeName: val
    });
  };

  addLocation = location => {
    this.setState(prevState => {
      return {
        location: {
          value: location,
          valid: true
        }
      };
    });
  };

  addPlace = () => {
    this.setState({ placeName: "" });
    if (this.state.placeName.trim() !== "") {
      this.props.onAdd(this.state.placeName, this.state.location);
    }
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Share a place with us!</Text>
          <PickImage />
          <PickLocation onLocationAdd={this.addLocation} />
          <Defaultinput
            placeholder="Place Name"
            value={this.state.placeName}
            changeTextHandler={this.changeTextHandler}
            style={{ width: "80%" }}
          />
          <Button title="Share the place" onPress={this.addPlace} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAdd: (name, location) => dispatch(addPlace(name, location))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);
