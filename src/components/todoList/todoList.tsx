import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./todoList.scss";
import { deleteTodo } from "../../actions";
import { useHistory } from "react-router-dom";

export const TodoList = () => {
  
  const selectList = [
    { value: 1, name: "All" },
    { value: 2, name: "is Check" },
    { value: 3, name: "No Check" },
  ];
  const titleTable = [
    { id: 1, titleName: "#" },
    { id: 2, titleName: "Role" },
    { id: 3, titleName: "Name Member" },
    { id: 4, titleName: "Age Member" },
    { id: 5, titleName: "Action" },
  ];
  const history = useHistory();
  const [todoList, setTodoList] = useState<any>();
  const [currrentOption, setCurrentOption] = useState<any>();
  const dispatch = useDispatch<any>();
  const dataStore: any = useSelector((state: any) => state.todoReducer.items);

  useEffect(() => {
    setTodoList(dataStore);
  }, [dataStore]);

  // isCheck todo
  const handleChecked = (item: any) => {
    const newToDos = [...todoList];
    newToDos.forEach((element: any) => {
      if (element.id === item.id) {
        element.isChecked = !element.isChecked;
      }
    });
    setTodoList(newToDos);
    currrentOption && handleSelectedTodo(currrentOption);
  };

  // handle select todo
  const handleSelectedTodo = (event: any) => {
    setCurrentOption(event);
    if (event.target.value === "1") {
      setTodoList(dataStore);
    }
    if (event.target.value === "2") {
      const sort = [...dataStore].filter((e: any) => e.isChecked);
      setTodoList(sort);
    }
    if (event.target.value === "3") {
      const sort = [...dataStore].filter((e: any) => !e.isChecked);
      setTodoList(sort);
    }
  };

  // Delete todo
  const handleDelete = (id: number) => {
    const deleteItem = todoList.filter((item: any) => item.id !== id);
    console.log(todoList);
    dispatch(deleteTodo(deleteItem));
  };

  // Edit todo
  const handleEdit = (event: any) => {
    history.push(`/edit/${event.id}`);
  };

  return (
    <div className="list-todo">
      <label className="font-14">Select Role</label>
      <div className="select-todo">
        <select onChange={(event) => handleSelectedTodo(event)}>
          <option value="0" disabled>
            Choose an option
          </option>
          {selectList.map((i) => {
            return (
              <option key={i.value} value={i.value}>
                {i.name}
              </option>
            );
          })}
        </select>
      </div>

      <table>
        <thead className="tbl-header">
          <tr>
            {titleTable.map((item: any) => {
              return (
                <th scope="col" key={item.id}>
                  {item.titleName}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="tbl-content">
          {todoList &&
            todoList.length > 0 &&
            todoList.map((item: any) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <input
                      className=""
                      type="checkbox"
                      value={item.id}
                      checked={item.isChecked ? item.isChecked : false}
                      onChange={() => handleChecked(item)}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>
                    <i
                      className="fas fa-pencil-alt"
                      onClick={() => handleEdit(item)}
                    ></i>
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
