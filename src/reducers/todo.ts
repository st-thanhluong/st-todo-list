import ACTION_TYPES from "../constants/actionType";

export const initialState = {
  todo: [
    { id: 0, name: "thành lương", age: 25 },
  ],
};
export default (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TODO:
      return {
        ...state,
        todo: [action.payload, ...state.todo],
      };
    case ACTION_TYPES.DELETE_TODO:
      // const newArray = state.todo.filter((item: any) => {action.payload !== item.id});
      console.log(action);
      console.log(state.todo.filter((item) => item.id !== action.payload));
      return {
        ...state,
        todo: state.todo.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
