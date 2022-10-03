import React, { useState } from "react";
import AddNewToDo from "./AddNewToDo";
import TodoList from "./TodoList";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);

  return (
    <>
      <div className="todo">
        {!edit && (
          <AddNewToDo todos={[todos, setTodos]} edits={[edit, setEdit]} />
        )}
        <TodoList todos={[todos, setTodos]} edits={[edit, setEdit]} />
      </div>
    </>
  );
}

export default Todo;
