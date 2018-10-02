import { UI_START_LOADING, UI_STOP_LOADING } from "../actions/actionTypes";

const initialState = {
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        loading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
