import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import { addPlace } from "../../store/actions/index";
import Inputs from "../../components/inputs/inputs";

class SharePlaceScreen extends Component {
  state = {};
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
