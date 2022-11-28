import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { RiCloseCircleLine, RiCheckboxCircleLine } from "react-icons/ri";
import EditTodo from "./EditTodo";

function ToDoCard1({ currentTask, tasks, setTasks, flag, handleDelete }) {
  const { _id, title, description } = currentTask;
  const [edit, setEdit] = useState(false);

  const completeTodo = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <>
      {edit ? (
        <EditTodo currentTodo={currentTask} setEdit={setEdit} flag={flag} />
      ) : currentTask.isComplete ? (
        <div className="todo-row complete">
          <p className="todo-text"> {title}</p>
          <p className="todo-text"> {description}</p>

          <div className="icons">
            <RiCloseCircleLine
              className="delete-icon"
              onClick={() => handleDelete(_id)}
            />
          </div>
        </div>
      ) : (
        <div className="todo-row ">
          <p className="todo-text"> {title}</p>
          <p className="todo-text"> {description}</p>
          <div className="icons">
            <TiEdit
              onClick={() => {
                setEdit(true);
                flag(true);
              }}
              className="edit-icon"
            />
            <RiCheckboxCircleLine
              className="complete-icon"
              onClick={() => completeTodo(_id)}
            />
            <RiCloseCircleLine
              className="delete-icon"
              onClick={() => handleDelete(_id)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ToDoCard1;
