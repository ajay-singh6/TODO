import React from "react";
import NewToDoCard from "./NewTodoCard";
import ToDoCard from "./ToDoCard";

function TodoList({ todos }) {

  const [todo, setTodos] = todos

  return (
    <>
      {todo
        ? todo.map((t) => (
            <ToDoCard key={t.id} task={t} color="red" list={todo} setTodos ={setTodos} />
          ))
        : ""}
    </>
  );
}

export default TodoList;
