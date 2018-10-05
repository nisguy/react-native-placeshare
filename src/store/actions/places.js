import {
  SET_PLACES,
  ADD_PLACE,
  START_ADD_PLACE,
  DELETE_PLACE
} from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

export const addPlace = (placeName, placeLocation, placeImage) => {
  return dispatch => {
    dispatch(uiStartLoading());
    var authToken = null;
    dispatch(authGetToken())
      .then(token => {
        authToken = token;
        fetch(
          "https://us-central1-place-sharing.cloudfunctions.net/uploadImage",
          {
            method: "POST",
            body: JSON.stringify({
              image: placeImage.base64
            }),
            headers: {
              authorization: "Bearer " + authToken
            }
          }
        )
          .catch(err => {
            console.log("Network error: ", err);
            dispatch(uiStopLoading());
          })
          .then(res => res.json())
          .then(parsedRes => {
            var placeData = {
              name: placeName,
              location: placeLocation,
              image: parsedRes.imageURL
            };
            fetch(
              "https://place-sharing.firebaseio.com/places.json?auth=" +
                authToken,
              {
                method: "POST",
                body: JSON.stringify(placeData)
              }
            )
              .catch(err => {
                console.log("Network error: ", err);
                dispatch(uiStopLoading());
              })
              .then(res => res.json())
              .then(parsedRes => {
                console.log("As you asked", parsedRes.name);
                dispatch(localPlaceAdd(parsedRes.name, placeData));
                dispatch(uiStopLoading());
              })
              .catch(err => {
                console.log("Error: ", err);
                dispatch(uiStopLoading());
              });
          })
          .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
          });
      })
      .catch(err => {});
  };
};

const localPlaceAdd = (key, placeData) => {
  return {
    type: ADD_PLACE,
    key,
    ...placeData,
    image: { uri: placeData.image }
  };
};

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  };
};

export const setPlacesAction = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const setPlaces = () => {
  console.log("fetching places...");
  return dispatch => {
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => alert("No valid token"))
      .then(token => {
        return fetch(
          "https://place-sharing.firebaseio.com/places.json?auth=" + token
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log("Data received");
        const fetchedPlaces = [];
        for (let key in parsedRes) {
          fetchedPlaces.push({
            ...parsedRes[key],
            image: { uri: parsedRes[key].image },
            key
          });
        }
        console.log(fetchedPlaces);
        dispatch(setPlacesAction(fetchedPlaces));
        dispatch(uiStopLoading());
      })
      .catch(error => {
        dispatch(uiStopLoading());
        console.log(error);
      });
  };
};

export const deletePlace = key => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => alert("No valid token"))
      .then(token => {
        return fetch(
          "https://place-sharing.firebaseio.com/places/" +
            key +
            ".json?auth=" +
            token,
          {
            method: "DELETE"
          }
        );
      })
      .then(res => res.json())
      .then(jsonData => {
        console.log("delete response: ", jsonData);
        dispatch({
          type: DELETE_PLACE,
          key
        });
      })
      .catch(err => {
        console.log(err);
        alert("Sorry something went wrong, please try again.");
      });
  };
};
