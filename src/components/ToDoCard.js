import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { RiCloseCircleLine } from "react-icons/ri";
import { RiCheckboxCircleLine } from "react-icons/ri";
import EditTodo from "./EditTodo";

function ToDoCard({ task,  list, setTodos }) {
  const [edit, setEdit] = useState(false);

  const completeTodo = (id) => {
    const updatedTodo = list.map((t) => {
      if (t.id === id) {
        t.isComplete = !t.isComplete;
      }
      return t;
    });
    setTodos(updatedTodo);
  };

  const deleteTodo = (id) => {
    const todo = list.filter((t) => t.id !== id);
    setTodos(todo);
  };

  return (
    <>
      {edit ? (
        <EditTodo currentTodo={task} list={list} setEdit={setEdit} />
      ) : (task.isComplete || false )? (
        <div className="todo-row complete">
          <p className="todo-text"> {task.value}</p>
          
          <div className="icons">
          <RiCloseCircleLine
              className="delete-icon"
              onClick={() => deleteTodo(task.id)}
            />
          </div>
        </div>
      ) : (
        <div className="todo-row ">
          <p className="todo-text"> {task.value}</p>
          <div className="icons">
            <TiEdit onClick={() => setEdit(true)} className="edit-icon" />
            <RiCheckboxCircleLine
              className="complete-icon"
              onClick={() => completeTodo(task.id)}
            />
            <RiCloseCircleLine
              className="delete-icon"
              onClick={() => deleteTodo(task.id)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ToDoCard;
