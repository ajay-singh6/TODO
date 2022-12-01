
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
  const [ state, setState] = React.useState({title: "React", discription: "Description."});

  const handleToggle = () => {
    setStyleCondition(!styleCondition)
  }

  const inputHandler = (e) => {
    setState({...state,[e.target.name]: e.target.value});
  }

  return (

    <Card
      sx={{
        minWidth: 100,
        minHeight: 358,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
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
              fullWidth
              placeholder="Todo - Title"
            >
            </TextField>
            {/* <br /> */}
            <TextField 
              sx={{"& hover, fieldset": { border: "none", borderBottom: "2px solid silver" }}} 
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

