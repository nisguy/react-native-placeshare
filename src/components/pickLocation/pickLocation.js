import React, { Component } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";

class PickLocation extends Component {
  componentWillMount() {
    this.reset();
  }

  reset = () => {
    this.setState({
      focusedLocation: {
        latitude: 0.0074,
        longitude: 37.0722,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get("window").width / Dimensions.get("window").height) *
          0.0122
      },
      isLocationChosen: false
    });
  };

  PickLocationHandler = event => {
    const cords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: cords.latitude,
      longitude: cords.longitude
    });
    this.setState({
      focusedLocation: {
        ...this.state.focusedLocation,
        longitude: cords.longitude,
        latitude: cords.latitude
      },
      isLocationChosen: true
    });
    this.props.onLocationAdd({
      latitude: cords.latitude,
      longitude: cords.longitude
    });
  };

  locateYourselfHandler = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        console.log(pos);
        const location = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        };
        this.PickLocationHandler(location);
      },
      err => {
        console.log(err);
        alert("Unable to fetch location, please pick location manually.");
      }
    );
  };

  render() {
    let marker = null;
    if (this.state.isLocationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          region={
            !this.state.isLocationChosen ? this.state.focusedLocation : null
          }
          style={styles.map}
          onPress={this.PickLocationHandler}
          ref={ref => (this.map = ref)}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={this.locateYourselfHandler} />
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
  map: {
    width: "100%",
    height: 250
  },
  button: {
    margin: 8
  }
});

export default PickLocation;
