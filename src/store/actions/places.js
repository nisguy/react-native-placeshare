import { SET_PLACES, ADD_PLACE, DELETE_PLACE } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";

export const addPlace = (placeName, placeLocation, placeImage) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch("https://us-central1-place-sharing.cloudfunctions.net/uploadImage", {
      method: "POST",
      body: JSON.stringify({
        image: placeImage.base64
      })
    })
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
        fetch("https://place-sharing.firebaseio.com/places.json", {
          method: "POST",
          body: JSON.stringify(placeData)
        })
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
        console.log("General error: ", err);
        dispatch(uiStopLoading());
      });
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
    fetch("https://place-sharing.firebaseio.com/places.json")
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
      .catch(error => console.log(error));
  };
};

export const deletePlace = key => {
  return dispatch => {
    fetch("https://place-sharing.firebaseio.com/places/" + key + ".json", {
      method: "DELETE"
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
