import React, { Fragment } from "react";
import Switch from "react-bootstrap/esm/Switch";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import { AddTodoList } from "./components/addTodoList/addTodoList";
import { EditTodoList } from "./components/editTodoList/editTodoList";
import { TodoList } from "./components/todoList/todoList";

function App() {
  return (
    <div>
      <Router>
        <div className="layout">
          <h2>Todos</h2>
          <div className="content-todo">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Fragment>
                    <AddTodoList />
                    <TodoList />
                  </Fragment>
                )}
              />
              <Route path="/edit/:id" component={EditTodoList} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
