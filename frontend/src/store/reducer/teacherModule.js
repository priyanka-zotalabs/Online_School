import { ADD_TEACHER_MODULE } from "./actionType";

let newState = [];

const teacherModule = (state = {}, action) => {
  // debugger;
  switch (action.type) {
    case ADD_TEACHER_MODULE:
      newState = [...action.params];
      return newState;
    default:
      return state;
  }
};

export default teacherModule;
