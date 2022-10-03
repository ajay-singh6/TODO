import React, { useState } from "react";

function EditTodo({ currentTodo, list, setEdit, edits }) {
  const [update, setUpdate] = useState(currentTodo.value);

  const inputHandler = (e) => {
    setUpdate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo(currentTodo);
    setUpdate("");
    const [editing, setEditing] = edits;
    setEditing(false);
  };

  const updateTodo = (currentTodo) => {
    const updatetodo = list.filter((e) => e.id === currentTodo.id);
    updatetodo[0]["value"] = update;
    setEdit(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form edit">
        <input
          className="todo-input"
          type="text"
          value={update}
          onChange={inputHandler}
        />
        <button className="todo-button">Update ToDo</button>
      </form>
    </>
  );
}

export default EditTodo;
