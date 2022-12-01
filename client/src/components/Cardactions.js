import react, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../assets/Formcontainer.css";
import { Data } from "./AddTodo";
import { AppContext } from "../App";

export default function Cardactions({ addTodo, editItem, input, setInput }) {
  const { todo, setTodo } = useContext(AppContext);
  const [value, setValue] = useState(0);

  const markComplete = () => {
    console.log("Complete");
  };

  const deleteItem = () => {
    console.log("delete");
  };

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
                  setInput((pre) => ({ ...pre, ["color"]: "orange" }));
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
            icon={<EditIcon onClick={editItem} />}
          />
        )}
        {addTodo && (
          <BottomNavigationAction
            label="Low"
            icon={
              <CircleIcon
                color="success"
                onClick={() => {
                  setInput((pre) => ({ ...pre, ["color"]: "green" }));
                  setTodo((p) => [...p, input]);
                }}
              />
            }
          />
        )}
      </BottomNavigation>
    </Box>
  );
}
