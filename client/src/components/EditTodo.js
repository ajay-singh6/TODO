import React, { useState } from "react";
import axios from "axios";

function EditTodo({ currentTodo, setEdit, flag }) {
  const [update, setUpdate] = useState({
    title: currentTodo.title,
    description: currentTodo.description,
  });

  const inputHandler = (e) => {
    setUpdate((update) => ({ ...update, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/todo/${currentTodo._id}`, update)
      .then((res) => {
        setEdit(false);
        setUpdate({
          title: "",
          description: "",
        });
      })
      .catch((err) => {
        console.log("Failed to update the ToDo");
        console.log(err.message);
      });
    flag(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form edit">
        <input
          className="todo-input"
          type="text"
          name="title"
          value={update.title}
          onChange={inputHandler}
        />
        <input
          className="todo-input"
          type="text"
          name="description"
          value={update.description}
          onChange={inputHandler}
        />
        <button className="todo-button">Update ToDo</button>
      </form>
    </>
  );
}

export default EditTodo;
