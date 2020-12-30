import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateTodo } from "../../actions";
import { MESSAGE_TODO } from "../../constants/messageType";
interface FormTodos {
  nameTodo: string;
  ageTodo: string;
}
const errorMessage = (error:any) => {
  return <div className="error-required">{error}</div>;
};
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
        <div className="form-input">
          <label className="form-label-thanh">Name member</label>
          <input
            type="text"
            className="form-control-thanh"
            placeholder="Please enter name members"
            name="nameTodo"
            ref={register({
              required: true,
              minLength: 3,
            })}
          />
          {errors.nameTodo && errors.nameTodo?.type === "required" && errorMessage(MESSAGE_TODO.required)}
          {errors.nameTodo && errors.nameTodo?.type === "minLength" && errorMessage(MESSAGE_TODO.minLength)}
        </div>
        <div className="form-input">
          <label className="form-label-thanh">Age members</label>
          <input
            type="text"
            className="form-control-thanh"
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
          {errors.ageTodo && errors.ageTodo?.type === "required" && errorMessage(MESSAGE_TODO.required)}
          {errors.ageTodo && errors.ageTodo?.type === "maxLength" && errorMessage(MESSAGE_TODO.maxLength)}
          {errors.ageTodo && errors.ageTodo?.type === "pattern" && errorMessage(MESSAGE_TODO.pattern)}
        </div>
        <button type="submit" className="btn-small btn-todolist">
          Edit Todo
        </button>
      </form>
    </div>
  );
};
