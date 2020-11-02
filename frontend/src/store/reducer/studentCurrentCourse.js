import { ADD_STUDENT_CURRENT_COURSE } from "./actionType";

let newState = {};

const studentCurrentCourse = (state = {}, action) => {
  // debugger;
  switch (action.type) {
    case ADD_STUDENT_CURRENT_COURSE:
      newState = ({}, { ...action.params });
      return newState;
    default:
      return state;
  }
};

export default studentCurrentCourse;
