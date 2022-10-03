import React from "react";
import ToDoCard from "./ToDoCard";

function TodoList({ todos, edits }) {
  const [todo, setTodos] = todos;

  return (
    <>
      {todo
        ? todo.map((t) => (
            <ToDoCard
              key={t.id}
              task={t}
              color="red"
              list={todo}
              setTodos={setTodos}
              edits={edits}
            />
          ))
        : ""}
    </>
  );
}

export default TodoList;
