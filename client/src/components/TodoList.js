import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useContext, useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoCard from "./ToDoCard";

import Navbar from "./Navbar";
import axios from "axios";
import { endpoint } from "../endpoints";
import { UserContext } from "../App";

const AppContext = createContext(null);
// const localUser = JSON.parse(localStorage.getItem("user"));

function Todolist( {isAuthenticated, setIsAuthenticated} ) {
  const { user, setUser } = useContext(UserContext);
  const [todo, setTodo] = useState([]);
 
  console.log("Todo page rendered"+isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
    const localUser = JSON.parse(localStorage.getItem("user"));
    console.log("TodoList (authtd): "+ isAuthenticated)
      axios
        .get(
          `${endpoint.baseUrl}${endpoint.todo}`,
          {
            headers: {
              Authorization: `Bearer ${localUser.token}`,
            },
          }
          )
        .then((response) => {
          console.log(response.body);
          setTodo([...response.data]);
        })
        .catch((err) => {
          console.log(err);
        });
        
    }
  }, [ isAuthenticated ]);

  return (
    <>
      <AppContext.Provider value={{ todo, setTodo }}>
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
        
      </AppContext.Provider>
    </>
  );
}

export default Todolist;
export { AppContext };
