import React, { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { RiCloseCircleLine, RiCheckboxCircleLine } from "react-icons/ri";
import EditTodo from "./EditTodo";
import axios from "axios";
import '../assets/card.css';

function ToDoCard({ currentTask, tasks, setTasks, flag, handleDelete }) {
  const { _id, title, description } = currentTask;
  const [edit, setEdit] = useState(false);

  let [styleCondition, setStyleCondition] = useState(false);
  let [textAreaValue, setTextAreaValue] = useState();

  const [update, setUpdate] = useState({
    title: currentTask.title,
    description: currentTask.description,
  });

  const handleToggle = ()=> {
      setStyleCondition(!styleCondition);
      // handleChange(_id);
  }

  const handleChange = (id) => {
      
      const updatedTasks = tasks.map((task) => {
      if (task._id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const deleteCard = () => {
      // handleDelete(index)
  }

  const inputHandler = (e) => {
    setTextAreaValue( e.target.value );
    console.log(textAreaValue)
    description = textAreaValue
    setUpdate((update) => ({ ...update, [e.target.name]: e.target.value }));
// ---------
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/todo/${currentTask._id}`, update)
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

      <div>
        <div className="note">
            <div className="head-container">
                <div className="head">
                    <a className="heading m-2" style={{"color": "#fff"}}>{update.title}</a>
                </div>
                <div className="tools">
                    {/* <button className="download"><i className="fas fa-download"></i></button> */}
                    <button className="edit" onClick={handleToggle}><i className="fas fa-edit"></i></button>
                    <button className="check" onClick={() => { setEdit(true); flag(true); }}><i className="fa-regular fa-circle-check fa-lg"></i></button>
                    <button className="delete" onClick={() => handleDelete(_id)}><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>
            <div className={styleCondition ? "text":"text hidden"}>{update.description}</div>
            <textarea className={styleCondition ? "area hidden":"area"} name='description' onChange={inputHandler} value={update.description}></textarea>
        </div>
      </div>
    </>
  );
}

export default ToDoCard;
