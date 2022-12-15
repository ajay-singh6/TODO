import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useContext, useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoCard from "./ToDoCard";
import Navbar from "./Navbar";
import axios from "axios";
import { UserContext } from "../App";

const AppContext = createContext(null);

function Todolist() {
  const { user, setUser } = useContext(UserContext);
  const [todo, setTodo] = useState([]);
 

  useEffect(() => {
    if (user?.id) {
    const {id} = JSON.parse(localStorage.getItem("user"));

      axios
        .get(`http://localhost:8000/api/todo/${id}`)
        .then((response) => {
          // console.log(response.data);
          setTodo([...response.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <AppContext.Provider value={{ todo, setTodo }}>
        <Navbar user={user}></Navbar>

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

            {todo.map((t) => {
              {/* console.log(t); */}
              return (
                <>
                  <Grid item lg={3} key={t._id}>
                    <TodoCard
                      title={t.title}
                      description={t.description}
                      color={t.color}
                      id={t._id}
                    />
                  </Grid>
                </>
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
