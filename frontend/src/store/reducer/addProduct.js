import { ADD_PRODUCT } from "./actionType";

let newState = {};

const addProduct = (state = {}, action) => {
  // debugger;
  switch (action.type) {
    case ADD_PRODUCT:
      newState = ({}, { ...action.params });
      return newState;
    default:
      return state;
  }
};

export default addProduct;
