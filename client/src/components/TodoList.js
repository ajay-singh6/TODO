import React, { useEffect } from "react";
import axios from "axios";

import ToDoCard from "./ToDoCard";

function TodoList({ todo, handleDelete, flag }) {
  const [tasks, setTasks] = todo;

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todo")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  return (
    <>
      {tasks
        ? tasks.map((currentTask) => (
            <ToDoCard
              key={currentTask._id}
              currentTask={currentTask}
              tasks={tasks}
              setTasks={setTasks}
              flag={flag}
              handleDelete={handleDelete}
              color="red"
            />
          ))
        : ""}
    </>
  );
}

export default TodoList;
