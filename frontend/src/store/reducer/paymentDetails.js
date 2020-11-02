import { ADD_PAYMENT } from "./actionType";

let newState = {};

const paymentDetails = (state = {}, action) => {
  // debugger;
  switch (action.type) {
    case ADD_PAYMENT:
      newState = ({}, { ...action.params });
      return newState;
    default:
      return state;
  }
};

export default paymentDetails;
