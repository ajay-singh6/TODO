import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoCard from "./ToDoCard";

import Navbar from "./Navbar";
import axios from "axios";
import { endpoint } from "../endpoints";
import Cookies from "js-cookie";

const AppContext = createContext({});

function Todolist( {isAuthenticated, setIsAuthenticated, todo, setTodo} ) {
  useEffect(() => {
    if (isAuthenticated) {
      const token = Cookies.get('jwt');
      axios
      .get(
          `${endpoint.baseUrl}${endpoint.todo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          )
        .then((response) => {
          setTodo([...response.data]);
        })
        .catch((err) => {
          console.log(err);
        });
        
    }
  }, [isAuthenticated, setTodo]);

  return (
    <>
      
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

        <Box className="todo-container" style={{ height: "calc(100vh - 68.5px)" }}>
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
                  <Grid item lg={3} key={t._id}>
                    <TodoCard key={t._id+"$"}
                      title={t.title}
                      description={t.description}
                      color={t.color}
                      id={t._id}
                    />
                  </Grid>
              );
            })}
          </Grid>
        </Box>
        
      
    </>
  );
}

export default Todolist;
export { AppContext };
