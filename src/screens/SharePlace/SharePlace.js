import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { addPlace } from "../../store/actions/index";
import Inputs from "../../components/inputs/inputs";

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

  render() {
    return (
      <View>
        <Inputs addPlace={this.props.onAdd} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAdd: name => dispatch(addPlace(name))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);
