import { ADD_TEACHER_CURRENT_COURSE } from "./actionType";

let newState = {};

const teacherCurrentCourse = (state = {}, action) => {
  // debugger;
  switch (action.type) {
    case ADD_TEACHER_CURRENT_COURSE:
      newState = ({}, { ...action.params });
      return newState;
    default:
      return state;
  }
};

export default teacherCurrentCourse;
