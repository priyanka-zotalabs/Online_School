import { ADD_TEACHER_COURSE } from "./actionType";

let newState = [];

const teacherCourse = (state = {}, action) => {
  // debugger;
  switch (action.type) {
    case ADD_TEACHER_COURSE:
      newState = [...action.params];
      return newState;
    default:
      return state;
  }
};

export default teacherCourse;
