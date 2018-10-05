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

import { addPlace, startAddPlace } from "../../store/actions/index";
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

  componentWillUpdate() {
    if (this.props.onPlaceAdd) {
      this.props.navigator.switchToTab({ tabIndex: 0 });
    }
  }

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
    if (this.state.placeName.trim() !== "") {
      this.props.onAdd(
        this.state.placeName,
        this.state.location.value,
        this.state.image.value
      );
      this.setState({ placeName: "" });
      this.imagePicker.reset();
      this.locationPicker.reset();
    }
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    console.log(event);
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        this.props.onPageRefresh();
      }
    }
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
          <PickImage
            pickImageHandler={this.addImage}
            ref={ref => (this.imagePicker = ref)}
          />
          <PickLocation
            onLocationAdd={this.addLocation}
            ref={ref => (this.locationPicker = ref)}
          />
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
    isLoading: state.UI.loading,
    onPlaceAdd: state.places.placeAdded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAdd: (name, location, image) => dispatch(addPlace(name, location, image)),
    onPageRefresh: () => dispatch(startAddPlace())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharePlaceScreen);
