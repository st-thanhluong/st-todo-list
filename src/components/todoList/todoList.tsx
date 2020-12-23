import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./todoList.scss";
import { deleteTodo } from "../../actions";
export const TodoList = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [todoList, settodoList] = useState<any>();
  const selectList = [
    { value: 1, name: "official staff" },
    { value: 2, name: "probationary staff" },
  ];
  const dispatch = useDispatch<any>();

  const value: any = useSelector((state) => state);
  useEffect(() => {
    settodoList(value.todo.todo);
  }, [value]);

  const handleSelectedTodo = (event: any) => {
    console.log(event.target.value);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="list-todo">
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Select Role</Form.Label>
          <Form.Control
            as="select"
            custom
            onChange={(event) => handleSelectedTodo(event)}
          >
            <option value="0" disabled>
              Select Role
            </option>
            {selectList.map((i) => {
              return (
                <option key={i.value} value={i.value}>
                  {i.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </Form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Role</th>
            <th scope="col">Name Member</th>
            <th scope="col">Age Member</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {todoList &&
            todoList.length > 0 &&
            todoList.map((item: any) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                      />
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>
                    <i
                      className="fas fa-trash-alt"
                      onClick={() => handleDelete(item.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
