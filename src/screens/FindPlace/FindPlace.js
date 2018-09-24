import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { deletePlace } from "../../store/actions/index";

import PlaceList from "../../components/ListItems/listItems";

class SharePlaceScreen extends Component {
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

  deletePlace = key => {
    this.props.onDelete(key);
    this.props.navigator.pop();
  };

  itemSelectHandler = key => {
    const selPlace = this.props.places.find(place => {
      return place.key === key;
    });
    this.props.navigator.push({
      screen: "awesome-place.PlaceDetail",
      title: selPlace.name,
      passProps: {
        onItemDeleted: () => this.deletePlace(selPlace.key),
        selectedPlace: selPlace
      }
    });
  };
  render() {
    return (
      <View>
        <PlaceList
          places={this.props.places}
          itemSelect={this.itemSelectHandler}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDelete: key => dispatch(deletePlace(key))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharePlaceScreen);
