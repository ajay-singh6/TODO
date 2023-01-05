import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Cardactions from "./Cardactions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { AppContext } from "./TodoList";
import { v4 as uuid } from "uuid";
import { addTodo } from "./ops";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Data = React.createContext(null);

export default function AddTodo() {
  const navigate = useNavigate()
  const { user } = React.useContext(UserContext);
  const { todo, setTodo } = React.useContext(AppContext);
  const [input, setInput] = React.useState({
    title: "",
    description: "",
    color: "",
  });

  const [open, setOpen] = React.useState(false);

 

  const handleClose = () => {
   navigate("/signin")
    setOpen(false);
  };

  // Handler Function
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const addTodoCb = (e) => {
    // console.log(user)
    addTodo(todo, input, setTodo, user.id, setOpen);
    setInput({
      title: "",
      description: "",
      color: "",
    });
  };

  return (
    <Card
      sx={{
        minWidth: "fit-content",
        width: "100%",
        minHeight: 358,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
      raised
    >
      <CardContent>
        {/* Todo title */}
        <Box component="form">
          <TextField
            sx={{
              "& fieldset": { border: "none" },
            }}
            placeholder="Title"
            name="title"
            fullWidth
            value={input.title}
            onChange={inputHandler}
          />

          {/* Todo description */}
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
            value={input.description}
            onChange={inputHandler}
          />
        </Box>
      </CardContent>
      <CardActions>
        {/* <Cardactions addTodo={true}  input={input} setInput={setInput} /> */}
        <FormControl sx={{ width: "100%" }}>
          <FormLabel
            sx={{ paddingLeft: "1.4em", color: "grey", opacity: "0.7" }}
          >
            Priority
          </FormLabel>
          <RadioGroup
            row
            name="color"
            value={input.color}
            onChange={inputHandler}
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
      <Button size="mid" variant="contained" onClick={addTodoCb}>
        Create
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Want to create a Todo?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Please signin to create a ToDo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} autoFocus>Sign In</Button>
          
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export { Data };
