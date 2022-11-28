
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Cardactions from "./Cardactions";
import { TextField } from "@mui/material";
import "../assets/Formcontainer.css"


export default function TodoCard({ title, discription, color }) {
  return (

    <Card
      sx={{
        minWidth: 300,
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
        <Typography className="todo-card-text" variant="h5" sx={{ height: "1.5em" }}>
          {" "}
          {title}
        </Typography>

        {/* Todo description */}
        <Typography className="todo-card-text" variant="p">{discription}</Typography>
      </CardContent>
      <CardActions>
        <Cardactions  addTodo={false}/>
      </CardActions>
    </Card>
  );
}

