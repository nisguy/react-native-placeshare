import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
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
    },
    image: {
      value: null,
      valid: false
    }
  };

  addImage = image => {
    this.setState(prevState => {
      return {
        ...prevState,
        image: {
          value: image,
          valid: true
        }
      };
    });
  };

  changeTextHandler = val => {
    this.setState({
      placeName: val
    });
  };

  addLocation = location => {
    this.setState(prevState => {
      return {
        ...prevState,
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
      this.props.onAdd(
        this.state.placeName,
        this.state.location.value,
        this.state.image.value
      );
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
    let shareButton = (
      <Button title="Share the place" onPress={this.addPlace} />
    );

    if (this.props.isLoading) {
      shareButton = <ActivityIndicator />;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Share a place with us!</Text>
          <PickImage pickImageHandler={this.addImage} />
          <PickLocation onLocationAdd={this.addLocation} />
          <Defaultinput
            placeholder="Place Name"
            value={this.state.placeName}
            changeTextHandler={this.changeTextHandler}
            style={{ width: "80%" }}
          />
          <View>{shareButton}</View>
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

const mapStateToProps = state => {
  return {
    isLoading: state.UI.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAdd: (name, location, image) => dispatch(addPlace(name, location, image))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharePlaceScreen);
