
import * as React from "react";
import { createContext, useEffect, useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Cardactions from "./Cardactions";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import "../assets/css/Formcontainer.css";
import { AppContext } from "./TodoList";
import { editTodo } from "./ops";
import { Button } from "react-bootstrap";

export default function TodoCard({ title, description, color, id }) {
  const { todo, setTodo } = useContext(AppContext);
  const [update, setUpdate] = useState({
    id: id,
    title: title,
    description: description,
    color: color,
  });
  const [ edit, setEdit ] = useState(false);

  const handleChange = (e) => {
    setUpdate({
      ...update,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    setEdit(false);

    editTodo(todo, setTodo, id, update);
  };

  const editItem = () => {
    console.log(`Edit btn clicked of ${id} - ${edit}`);
    setEdit(true);
  };

  return (

    <Card
      sx={{
        minWidth: 100,
        minHeight: 358,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",

        width: "100%",
        borderTop: `10px solid ${color}`
      }}
      raised
    >
      {edit ? (
        <>
          <CardContent>
            <Box component="form">
              <TextField
                sx={{
                  "& fieldset": { border: "none" },
                }}
                placeholder="Title"
                name="title"
                fullWidth
                value={update.title}
                onChange={handleChange}
              />
              <TextField
                sx={{
                  "& fieldset": { border: "none" },
                }}
                placeholder="Description"
                name="description"
                fullWidth
                margin="dense"
                rows={4}
                id="outlined-multiline-static"
                multiline
                value={update.description}
                onChange={handleChange}
              />
            </Box>
          </CardContent>
          <CardActions sx={{ padding: "0.8em 8px" }}>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel
                sx={{ paddingLeft: "1.4em", color: "grey", opacity: "0.7" }}
              >
                Priority
              </FormLabel>
              <RadioGroup
                row
                name="color"
                value={update.color}
                onChange={handleChange}
                sx={{ justifyContent: "space-around", padding: "0 1.4em" }}
              >
                <FormControlLabel
                  value="red"
                  control={<Radio color="error" />}
                  label="High"
                />
                <FormControlLabel
                  value="orange"
                  control={<Radio color="warning" />}
                  label="Mid"
                />
                <FormControlLabel
                  value="green"
                  control={<Radio color="success" />}
                  label="Low"
                />
              </RadioGroup>
            </FormControl>
          </CardActions>
          <Button
            color="primary"
            variant="contained"
            size="medium"
            onClick={handleUpdate}
          >
            Done
          </Button>
        </>
      ) : (
        <>
          <CardContent>
            <Box>
              {/* Todo title */}
              <Typography
                className="todo-card-text"
                variant="h5"
                sx={{ height: "1.5em" }}
              >
                {" "}
                {title}
              </Typography>

              {/* Todo description */}
              <Typography className="todo-card-text" variant="p">
                {description}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Cardactions addTodo={false} editItem={editItem} id={id} />
          </CardActions>
        </>
      )}
    </Card>
  );
}
