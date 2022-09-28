import React from "react";
import { useState } from "react";
import AddNewToDo from "./AddNewToDo";
import TodoList from "./TodoList";

function Todo() {
  const [todos, setTodos] = useState([]);

  return (
    <>
      <div className="todo">
        <AddNewToDo todos={[todos, setTodos]} />
        <TodoList todos={[todos, setTodos]}  />
      </div>
    </>
  );
}

export default Todo;
