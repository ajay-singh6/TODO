import React, { useState } from "react";
import axios from "axios";

import AddNewToDo from "./AddNewToDo";
import TodoList from "./TodoList1";

function Todo() {
  const [todo, setTodo] = useState([]);
  const [hideFlag, setHideFlag] = useState(false);

  const handleDelete = (_id) => {
    axios.delete(`http://localhost:8000/api/todo/${_id}`);
  };

  return (
    <>
      <div className="todo">
        {!hideFlag && <AddNewToDo flag={[hideFlag, setHideFlag]} />}
        <TodoList
          todo={[todo, setTodo]}
          handleDelete={handleDelete}
          flag={setHideFlag}
        />
      </div>
    </>
  );
}

export default Todo;
