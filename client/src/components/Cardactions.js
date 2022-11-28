import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import { Typography } from "@mui/material";
import "../assets/Formcontainer.css";

export default function Cardactions({ addTodo, handleToggle }) {
  const [value, setValue] = React.useState(0);

  const markComplete = () => {
    console.log("Complete");
  };

  const deleteItem = () => {
    console.log("delete");
  };

  const setPriority = (e) => {
    console.log(e);
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
              <CircleIcon color="error" onClick={setPriority} />
            ) : (
              <CheckIcon onClick={markComplete} />
            )
          }
        />
        
        <BottomNavigationAction
          label={addTodo ? "Mid" : "Delete"}
          icon={
            addTodo ? (
              <CircleIcon color="warning" onClick={setPriority} />
            ) : (
              <DeleteIcon onClick={deleteItem} />
            )
            
          }

        />

        {!addTodo && <BottomNavigationAction
          label="Edit"
          icon={
            <EditIcon/>
          }
          onClick={handleToggle}
        />}
        {addTodo && (
          <BottomNavigationAction
            label="Low"
            icon={<CircleIcon color="success" onClick={setPriority} />}
          />
        )}
      </BottomNavigation>
    </Box>
  );
}
