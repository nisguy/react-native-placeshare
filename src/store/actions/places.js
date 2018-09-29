import {
  ADD_PLACE,
  DELETE_PLACE,
  TRY_AUTH,
  DESELECT_PLACE
} from "./actionTypes";

export const addPlace = (placeName, placeLocation) => {
  return {
    type: ADD_PLACE,
    placeName: placeName,
    placeLocation: placeLocation
  };
};
export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    key
  };
};
export const tryAuth = userData => {
  console.log("login attempt");
  return {
    type: TRY_AUTH,
    userData: userData
  };
};

export const deselectPlace = () => {
  return {
    type: DESELECT_PLACE
  };
};
