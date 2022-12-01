import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import AddTodo from "./AddTodo";
import TodoCard from "./ToDoCard";
import { AppContext } from "../App";

function Todolist() {
  const { todo } = useContext(AppContext);
  // const todo = [
  // {
  //   title: "complete todo",
  //   discription: "Need to complete todo application",
  //   prio: 1,
  // },
  // {
  //   title: "complete todo",
  //   discription: "Need to complete todo application",
  //   prio: 1,
  // },
  // ];

  // console.log(todo);
  return (
    <>
      <Box style={{ height: "calc(100vh - 68.5px)", marginTop: "6rem" }}>
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

          {todo.map((t) => {
            return (
              <>
                <Grid item lg={3}>
                  <TodoCard
                    title={t.title}
                    discription={t.discription}
                    color={t.color}
                  />
                </Grid>
              </>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}

export default Todolist;
