import { ADD_COURSE } from "./actionType";

let newState = [];

const course = (state = {}, action) => {
  // debugger;
  switch (action.type) {
    case ADD_COURSE:
      newState = [...action.params];
      return newState;
    default:
      return state;
  }
};

export default course;
