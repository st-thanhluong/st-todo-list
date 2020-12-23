import { uniqueId } from "lodash";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTodo } from "../../actions";
import "./addTodoList.scss";
interface FormTodos {
  nameTodo: string;
  ageTodo: string;
}
export const AddTodoList = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, reset } = useForm<FormTodos>();
  const onSubmit = (data: any, e: any) => {
    if (data) {
      const value = {
        id: uniqueId(),
        name: data.nameTodo,
        age: data.ageTodo,
      }
      dispatch(createTodo(value));
    }
    e.target.reset();
  };
  return (
    <div className="add-todo">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Name member</label>
          <input
            type="text"
            className="form-control"
            placeholder="Please enter name members"
            name="nameTodo"
            ref={register({
              required: true,
              minLength: 3,
            })}
          />
          {errors.nameTodo?.type === "required" && (
            <p style={{ color: "red" }}>Your input is required</p>
          )}
          {errors.nameTodo?.type === "minLength" && (
            <p style={{ color: "red" }}>
              Your input must be larger then 3 characters
            </p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Age members</label>
          <input
            type="text"
            className="form-control"
            placeholder="Please enter age members"
            name="ageTodo"
            ref={register({
              required: true,
              maxLength: 3,
              pattern: {
                value: /^[1-9][0-9]?$|^100$/i,
                message: "abc",
              },
            })}
          />
          {errors.ageTodo?.type === "required" && (
            <p style={{ color: "red" }}>Your input is required</p>
          )}
          {errors.ageTodo?.type === "maxLength" && (
            <p style={{ color: "red" }}>
              Your input must be less than 3 characters
            </p>
          )}
          {errors.ageTodo?.type === "pattern" && (
            <p style={{ color: "red" }}>
              Your input should be a number between 1-100.
            </p>
          )}
        </div>
        <button type="submit" className="btn btn-success">
          {" "}
          Add Todo
        </button>
      </form>
    </div>
  );
};
