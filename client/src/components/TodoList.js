import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useContext, useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoCard from "./ToDoCard";

import Navbar from "./Navbar";
import axios from "axios";
import { endpoint } from "../endpoints";
import { UserContext } from "../App";
import Cookies from "js-cookie";

const AppContext = createContext({});
// const localUser = JSON.parse(localStorage.getItem("user"));

function Todolist( {isAuthenticated, setIsAuthenticated, user, setUser, todo, setTodo} ) {
  // const { user, setUser } = useContext(UserContext);
  
 
  // console.log("Todo page rendered "+isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
    // const localUser = JSON.parse(localStorage.getItem("user"));
    const token = Cookies.get('jwt');
    // console.log("TodoList (authtd): "+ isAuthenticated)
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
          // console.log(response.body);
          setTodo([...response.data]);
        })
        .catch((err) => {
          console.log(err);
        });
        
    }
  }, [ isAuthenticated ]);

  return (
    <>
      
        <Navbar user={user} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

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

            {todo.map((t, idx) => {
              return (
                  <Grid item lg={3} key={t._id}>
                    <TodoCard key={t._id +" " + idx}
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
