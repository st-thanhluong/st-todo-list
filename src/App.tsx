import React from "react";
import "./App.scss";
import { AddTodoList } from "./components/addTodoList/addTodoList";
import { TodoList } from "./components/todoList/todoList";

function App() {
  return (
    <div>
      <div className="layout">
        <h2>Todos</h2>
        <div className="content-todo">
          <AddTodoList />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
