import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Cardactions from "./Cardactions";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { AppContext } from "../App";
import { v4 as uuid } from "uuid";

const Data = React.createContext(null);

export default function AddTodo() {
  const { todo, setTodo } = React.useContext(AppContext);
  const [input, setInput] = React.useState({
    title: "",
    discription: "",
    color: "",
  });

  // Handler Function
  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const addTodo = (e) => {
    const genId = uuid();
    setInput({ ...input, id: genId });
    setTodo((pre) => [...pre, input]);
    console.log(input)
  };

  return (
    <Card
      sx={{
        minWidth: 300,
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
            placeholder="Discription"
            name="discription"
            fullWidth
            margin="dense"
            rows={4}
            id="outlined-multiline-static"
            multiline
            value={input.discription}
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
      <Button size="mid" variant="contained" onClick={addTodo}>
        Create
      </Button>
    </Card>
  );
}

export { Data };
