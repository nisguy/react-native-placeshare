import {
  ADD_PLACE,
  DELETE_PLACE,
  SELECT_PLACE,
  DESELECT_PLACE
} from "../actions/actionTypes";

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
          name: action.placeName,
          image: {
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHNGiLLHqZjflETpVrO4RqAOOwTu8R-ZgvcbL53oaHJvOto8tdcA"
          }
        })
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
    case DESELECT_PLACE:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default reducer;
