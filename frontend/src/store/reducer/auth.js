import { SET_AUTH_USER, CLEAR_AUTH, CHANGE_ROLE } from "./actionType";

let initState = {
  loading: true,
};
let newState = {};

const auth = (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      newState = {
        ...state,
        loggedIn: true,
        ...action.user,
        profile: action.user && action.user.profile ? action.user.profile : {},
        currentRole: action.user.roleId[0],
        currentMetaData:
          action.user.userMetaData[action.user.roleId[0].displayName],
      };
      return newState;
    case CHANGE_ROLE:
      newState = {
        ...state,
        currentRole: action.toRole,
        currentMetaData: state.userMetaData[action.toRole.displayName],
      };
      return newState;
    case CLEAR_AUTH:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default auth;
