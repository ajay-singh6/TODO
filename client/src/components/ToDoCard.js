import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Cardactions from "./Cardactions";
import { TextField } from "@mui/material";
import "../assets/Formcontainer.css"

export default function TodoCard({ title, discription, color }) {

  const [styleCondition, setStyleCondition] = React.useState(true)
  const [ state, setState] = React.useState({title: "React", discription: "Learn hooks, MUI documentation from 5 to 6 pm."});

  const handleToggle = () => {
    setStyleCondition(!styleCondition)
    console.log(styleCondition)
  }

  const inputHandler = (e) => {
    setState({...state,[e.target.name]: e.target.value});
    console.log(state.title + " : " + state.discription) 
  }

  return (
    <Card
      sx={{
        minWidth: 250,
        minHeight: 358,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "100%",
        borderTop:`10px solid ${color}`
      }}
      
      raised
    >
      <CardContent>
        {/* Todo title */}

        {/* Todo description */}
        

        {styleCondition ?
          <>
            <Typography className="todo-card-title" variant="h5" > {state.title ? state.title : "Enter title here"} </Typography>
            <Typography className="todo-card-text" variant="p">{state.discription ? state.discription : "Enter todo description"}</Typography>
          </> 
          : 
          <>
            <TextField 
              sx={{"& hover, fieldset": { border: "none", borderBottom: "2px solid silver" }}} 
              className="todo-card-title" 
              onChange={inputHandler} 
              name="title" 
              value={state.title}
              placeholder="Todo - Title"
              fullWidth
            >
            </TextField>
            {/* <br /> */}
            <TextField 
              sx={{"& fieldset": { border: "none" } }} 
              className="todo-card-text" 
              onChange={inputHandler} 
              name="discription" 
              value={state.discription}
              fullWidth
              placeholder="Description"></TextField>
          </>
        }

      </CardContent>
      <CardActions>
        <Cardactions  addTodo={false} handleToggle = {handleToggle}/>
        
      </CardActions>
    </Card>
  );
}

