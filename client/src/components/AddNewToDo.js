import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function AddNewToDo({ todos, edits }) {
  const [todo, setTodos] = todos;
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input || /^\s*$/.test(input)) {
      return;
    }

    AddToDo({
      id: uuid(),
      value: input,
    });
    setInput("");
  };

  //   Adding TODO
  const AddToDo = (newtodo) => {
    const newToDo = [newtodo, ...todo];
    setTodos(newToDo);
    console.log(todo);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Enter ToDo"
          value={input}
          onChange={inputHandler}
          className="todo-input"
        />
        <button disabled={edits[0]} className="todo-button">
          Add ToDo
        </button>
      </form>
    </>
  );
}

export default AddNewToDo;
