import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  Button,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";

import HeadingText from "../../components/UI/headingText";
import backgroundImage from "../../assets/background.jpg";
import { tryAuth, autoSignIn } from "../../store/actions/index";

import validator from "../../utlity/validator";

class Auth extends Component {
  state = {
    portrait: true,
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: false
        }
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        }
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        }
      }
    }
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.responsiveFunc);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.responsiveFunc);
  }

  componentDidMount() {
    this.props.onAutoSignIn();
  }

  responsiveFunc = dims => {
    this.setState({
      portrait: dims.window.height > 500 ? true : false
    });
  };

  updateInput = (key, value) => {
    let connectedValue = {};

    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }

    if (this.state.controls[key].validationRules.equalTo) {
      equalControl = this.state.controls[key].validationRules.equalTo;
      equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }

    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validator(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validator(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            )
          }
        }
      };
    });
  };

  switchMode = () => {
    // this.setState(prevState => {
    //   return {
    //     authMode: prevState.authMode === "login" ? "signup" : "login"
    //   };
    // });
    console.log(this.state.authMode);
    this.setState({
      authMode: this.state.authMode === "login" ? "signup" : "login"
    });
  };

  authHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onTryAuth(authData, this.state.authMode);
  };
  render() {
    let headingText = null;
    let confirmPass = null;
    if (this.state.authMode === "signup") {
      confirmPass = (
        <View
          style={
            this.state.portrait ? styles.pwitemPortrait : styles.pwItemLandScape
          }
        >
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor="white"
            value={this.state.controls.confirmPassword.value}
            onChangeText={val => this.updateInput("confirmPassword", val)}
            secureTextEntry
          />
        </View>
      );
    }

    if (this.state.portrait) {
      headingText = (
        <HeadingText>
          <Text>
            Please {this.state.authMode === "signup" ? "Sign up" : "Login"}
          </Text>
        </HeadingText>
      );
    }

    let submit = (
      <Button
        title="Submit"
        disabled={
          this.state.authMode == "signup" &&
          !this.state.controls.confirmPassword.valid
        }
        onPress={this.authHandler}
      />
    );

    if (this.props.isLoading) {
      submit = <ActivityIndicator />;
    }

    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {headingText}
            <Button
              title={
                this.state.authMode === "login"
                  ? "Switch to Sign up"
                  : "Switch to Login"
              }
              onPress={this.switchMode}
            />
            <View style={styles.inputsContainer}>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="white"
                value={this.state.controls.email.value}
                onChangeText={val => this.updateInput("email", val)}
                keyboardType="email-address"
              />
              <View
                style={
                  this.state.portrait
                    ? styles.pwContainerPortrait
                    : styles.pwcontainerLandScape
                }
              >
                <View
                  style={
                    this.state.portrait || this.state.authMode === "login"
                      ? styles.pwitemPortrait
                      : styles.pwItemLandScape
                  }
                >
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="white"
                    value={this.state.controls.password.value}
                    onChangeText={val => this.updateInput("password", val)}
                    secureTextEntry
                  />
                </View>
                {confirmPass}
              </View>
            </View>
            {submit}
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputsContainer: {
    width: "80%"
  },
  pwContainerPortrait: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  pwitemPortrait: {
    width: "100%"
  },
  pwcontainerLandScape: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  pwItemLandScape: {
    width: "45%"
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.UI.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (userData, authMode) => {
      dispatch(tryAuth(userData, authMode));
    },
    onAutoSignIn: () => dispatch(autoSignIn())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
