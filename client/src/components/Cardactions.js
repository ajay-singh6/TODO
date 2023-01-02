import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import { Typography } from "@mui/material";
import "../assets/css/Formcontainer.css";
import { Data } from "./AddTodo";
import { AppContext } from "./TodoList";
import { removeTodo } from "./ops";


export default function Cardactions({ addTodo, input, setInput, setEdit, id }) {
  // console.log("CardActions : ", AppContext);
  const { todo, setTodo } = useContext(AppContext);
  const [value, setValue] = useState(0);

  const markComplete = () => {
    console.log("Complete");
  };

  const deleteItem = () => {
    removeTodo(todo, setTodo, id);
  };

  useEffect(() => {
    // console.log("Cardactions (todo): " + JSON.stringify(todo));
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {addTodo && (
        <Typography
          className="todo-card-text"
          variant="p"
          sx={{ opacity: "0.8", color: "grey", paddingLeft: "1.4em" }}
        >
          Priority
        </Typography>
      )}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          // console.log(event.target.data)
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label={addTodo ? "High" : "Complete"}
          icon={
            addTodo ? (
              <CircleIcon
                color="error"
                onClick={() => {
                  setInput((pre) => ({ ...pre, "color": "red" }));
                  console.log(input);
                  setTodo((p) => [...p, input]);
                }}
              />
            ) : (
              <CheckIcon onClick={markComplete} />
            )
          }
        />
        
        <BottomNavigationAction
          label={addTodo ? "Mid" : "Delete"}
          icon={
            addTodo ? (
              <CircleIcon
                color="warning"
                onClick={() => {
                  setInput((pre) => ({ ...pre, "color": "orange" }));
                  setTodo((p) => [...p, input]);
                }}
              />
            ) : (
              <DeleteIcon onClick={deleteItem} />
            )
            
          }

        />

        {!addTodo && (
          <BottomNavigationAction
            label="Edit"
            icon={<EditIcon onClick={() => setEdit(true)} />}
          />
        )}
        {/* {addTodo && (
          <BottomNavigationAction
            label="Low"
            icon={
              <CircleIcon
                color="success"
                onClick={() => {
                  setInput((pre) => ({ ...pre, "color": "green" }));
                  setTodo((p) => [...p, input]);
                }}
              />
            }
          />
        )} */}
      </BottomNavigation>
    </Box>
  );
}
