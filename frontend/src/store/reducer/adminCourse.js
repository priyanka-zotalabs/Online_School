import { ADD_ADMIN_COURSE } from "./actionType";

let newState = [];

const adminCourse = (state = {}, action) => {
  // debugger;
  switch (action.type) {
    case ADD_ADMIN_COURSE:
      newState = [...action.params];
      return newState;
    default:
      return state;
  }
};

export default adminCourse;
