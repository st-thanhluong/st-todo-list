import ACTION_TYPES from "../constants/actionType";

export const createTodo = (value: object) => ({
  type: ACTION_TYPES.ADD_TODO,
  payload: value,
});

export const deleteTodo = (value: any) => ({
  type: ACTION_TYPES.DELETE_TODO,
  payload: value,
});

export const updateTodo = (value: object) => ({
  type: ACTION_TYPES.UPDATE_TODO,
  payload: value,
});
