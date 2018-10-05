import {
  SET_PLACES,
  ADD_PLACE,
  DELETE_PLACE,
  SELECT_PLACE,
  START_ADD_PLACE
} from "../actions/actionTypes";

const initialState = {
  places: [],
  placeAdded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: action.key,
          name: action.name,
          image: action.image,
          location: action.location
        }),
        placeAdded: true
      };
    case START_ADD_PLACE:
      return {
        ...state,
        placeAdded: false
      };
    case SET_PLACES:
      return {
        ...state,
        places: action.places
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key;
        })
      };
    case SELECT_PLACE:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default reducer;
