import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Cardactions from "./Cardactions";
import { TextField } from "@mui/material";

export default function AddTodo() {
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
        <TextField
          sx={{
            "& fieldset": { border: "none" },
          }}
          placeholder="Title"
          name="title"
          fullWidth
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
        />
      </CardContent>
      <CardActions>
        <Cardactions addTodo={true} />
      </CardActions>
    </Card>
  );
}
