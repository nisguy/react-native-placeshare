import { AsyncStorage } from "react-native";

import { uiStartLoading, uiStopLoading } from "./index";

import App from "../../../App";
import startMainTabs from "../../screens/MainTabs/startMainTabs";
import { SET_TOKEN, REMOVE_TOKEN } from "./actionTypes";

const API_KEY = "AIzaSyCKNypbWYqJB7DPsrZ3_3pvmQ5rKrzU12A";

export const tryAuth = (userData, authMode) => {
  return dispatch => {
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      API_KEY;
    if (authMode == "signup") {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
        API_KEY;
    }
    dispatch(authenticate(userData, url));
  };
};

const authenticate = (userData, url) => {
  return dispatch => {
    console.log("Signup attempt");
    dispatch(uiStartLoading());
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        dispatch(uiStopLoading());
        console.log(err);
        alert("Authentication failed. Please try again.");
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        console.log(parsedRes);
        if (parsedRes.error) {
          alert(parsedRes.error.message);
        } else {
          console.log(typeof parsedRes.expiresIn);
          dispatch(
            authStoreToken(parsedRes.idToken, "20", parsedRes.refreshToken)
          );
          startMainTabs();
        }
      })
      .catch(err => {
        dispatch(uiStopLoading());
        console.log(err);
        alert("application error! Retry.");
      });
  };
};

const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    AsyncStorage.setItem("ap:auth:token", token);
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    console.log(expiryDate);
    AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
    dispatch({ type: SET_TOKEN, token: token });
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      let storedToken;
      const token = getState().auth.token;
      if (!token) {
        AsyncStorage.getItem("ap:auth:token")
          .then(tokenFromStorage => {
            if (tokenFromStorage != null) {
              storedToken = tokenFromStorage;
              return AsyncStorage.getItem("ap:auth:expiryDate");
            } else {
              reject();
            }
          })
          .then(expiryDate => {
            const now = new Date();
            console.log(now);
            const parsedExpiry = new Date(parseInt(expiryDate));
            console.log(parsedExpiry);
            if (parsedExpiry > now) {
              console.log("Not yet expired");
              dispatch({ type: SET_TOKEN, token: storedToken });
              resolve(storedToken);
            } else {
              console.log("Token expired");
              reject();
            }
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      } else {
        resolve(token);
      }
    });
    promise.catch(err => {
      AsyncStorage.getItem("ap:auth:refreshToken")
        .then(refreshToken => {
          console.log(refreshToken);
          return fetch(
            "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body: "grant_type=refresh_token&refresh_token=" + refreshToken
            }
          );
        })
        .then(res => res.json())
        .then(parsedRes => {
          if (parsedRes.id_token) {
            console.log(parsedRes);
            dispatch(
              authStoreToken(
                parsedRes.id_token,
                parsedRes.expires_in,
                parsedRes.refresh_token
              )
            );
            return parsedRes.id_token;
          } else {
            dispatch(removeAsyncStorage());
          }
        })
        .then(token => {
          return token;
        })
        .catch(err => {
          console.error(err);
        });
    });
    return promise;
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(removeAsyncStorage())
      .then(() => {
        console.log("redirecting to login page...");
        dispatch({ type: REMOVE_TOKEN });
        App();
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const removeAsyncStorage = () => {
  return dispatch => {
    console.log("cleaning asyncStorage...");
    AsyncStorage.removeItem("ap:auth:refreshToken");
    AsyncStorage.removeItem("ap:auth:token");
    return AsyncStorage.removeItem("ap:auth:expiryDate");
  };
};

export const autoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs();
      })
      .catch(err => console.log("Autosignin failed."));
  };
};
