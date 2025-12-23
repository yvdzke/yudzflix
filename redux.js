import { lagacy_createStore } from "redux";

// reducer
const movieReducer = (
  state = { movies: [{ id: 1, title: "Movie 1" }] },
  action
) => {
  switch (action.type) {
    case "SET_MOVIES":
      return { ...state, movies: [...state.movies, action.payload] };
    default:
      return state;
  }
};

// store
const store = lagacy_createStore(movieReducer);
console.log("oncreate store :", store.getState());

// subscribe
store.subscribe(() => {
  console.log("STORE CHANGE :", store.getState());
});

// dispatch
const action1 = { type: "SET_MOVIES", payload: { id: 3, title: "Ini Yuds" } };
store.dispatch(action1);
const action2 = {
  type: "SET_MOVIES",
  payload: { id: 5, title: "Ini Yuda aja kwkwkwk" },
};
store.dispatch(action2);
