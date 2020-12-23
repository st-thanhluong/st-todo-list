import ACTION_TYPES from "../constants/actionType";

export const createTodo = (value: object) => ({
    type: ACTION_TYPES.ADD_TODO,
    payload: value
  });

  export const deleteTodo = (id: number) => ({
    type: ACTION_TYPES.DELETE_TODO,
    payload: id
  });