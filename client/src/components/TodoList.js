import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AddTodo from "./AddTodo";
import TodoCard from "./ToDoCard";
import "../assets/Formcontainer.css";

function TodoList() {
  const todo = [
    {
      title: "complete todo",
      discription: "Need to complete todo application",
      prio: 1,
    },
  ];

  return (
    <div className="todo-container">
      <Box style={{ height: "calc(100vh - 68.5px)" }}>
        <Grid
          container
          spacing={4}
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            padding: "0 5rem",
          }}
        >
          <Grid item lg={3} width>
            <AddTodo />
          </Grid>

          {todo.map((t) => (
            <Grid item lg={3}>
              <TodoCard title={t.title} discription={t.discription} color={t.color} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default TodoList;
