import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateTodo } from "../../actions";
interface FormTodos {
  nameTodo: string;
  ageTodo: string;
}

export const EditTodoList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<any>();
  const [listData, setListData] = useState<any>();
  const dataStore: any = useSelector((state: any) => state.todoReducer.items);
  const { register, handleSubmit, errors, setValue } = useForm<FormTodos>();

  const goBack = () => {
    history.push("/");
  };

  useEffect(() => {
    if (id && dataStore) {
      setListData(dataStore);
      const listTodo = dataStore;
      listTodo.forEach((element: any) => {
        if (Number(id) === element.id) {
          setValue("nameTodo", element.name);
          setValue("ageTodo", element.age);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dataStore]);

  // handle edit todo 
  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    if (data) {
      const result = listData.map((value: any) => {
        if (Number(id) === value.id) {
          value.name = data.nameTodo ? data.nameTodo : value.name;
          value.age = Number(data.ageTodo) ? Number(data.ageTodo) : value.age;
        }
        return value;
      });
      dispatch(updateTodo(result));
    }
    goBack();
  };

  return (
    <div className="edit-todo">
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
                message: "",
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
          Edit Todo
        </button>
      </form>
    </div>
  );
};
