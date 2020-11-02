import { ADD_MODULE } from "./actionType";

let newState = [];

const courseModule = (state = {}, action) => {
  // debugger;
  switch (action.type) {
    case ADD_MODULE:
      newState = [...action.params];
      return newState;
    default:
      return state;
  }
};

export default courseModule;
