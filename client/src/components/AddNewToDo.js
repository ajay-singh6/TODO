import React, { useState } from "react";
import axios from "axios";

function AddNewToDo({ flag }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    isComplete: false,
  });

  const inputHandler = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/todo", data)
      .then((res) => {
        setData({ title: "", description: "", isComplete: false });
      })
      .catch((err) => {
        console.log("Error couldn't create TODO");
        console.log(err.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          name="title"
          placeholder="Enter ToDo Title"
          value={data.title}
          onChange={inputHandler}
          className="todo-input"
        />
        <input
          type="text"
          name="description"
          placeholder="Enter ToDo Descrption"
          value={data.description}
          onChange={inputHandler}
          className="todo-input"
        />
        <br />
        <button disabled={flag[0]} className="todo-button">
          Add ToDo
        </button>
      </form>
    </>
  );
}

export default AddNewToDo;
