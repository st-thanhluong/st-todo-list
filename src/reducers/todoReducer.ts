import ACTION_TYPES from "../constants/actionType";

export const initialState = {
  items: [
    { id: 10, name: "thành lương", age: 26 },
    { id: 11, name: "thành lương", age: 25 },
    { id: 12, name: "thành lương", age: 24 },
    { id: 13, name: "thành lương", age: 23 },
    { id: 14, name: "thành lương", age: 22 },
    { id: 15, name: "thành lương", age: 21 },
  ],
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TODO:
      return {
        items: [action.payload, ...state.items],
      };
    case ACTION_TYPES.DELETE_TODO:
      return {
        items: action.payload,
      };
    case ACTION_TYPES.UPDATE_TODO:
      return {
        items: action.payload
      };
    default:
      return state;
  }
};
