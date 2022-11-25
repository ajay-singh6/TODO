import { React, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import Signinform from "./Signinform";
import Signupform from "./Signupform";

import '../assets/Formcontainer.css'




function Formcontainer() {
  const [move, setMove] = useState("");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100wh",
          height: "100vh",
        }}
      >
        <Paper
          sx={{
            bgcolor: "#cfe8fc",
            height: "80vh",
            width: "70vw",
            display: "flex",
            transition: "all 0.2s ease-in",
          }}
          className={move}
          elevation={3}
        >
          {/* form container */}
          {move ? <Signupform /> : <Signinform />}
          {/* right side container */}
          <Box style={style.Box} className="hide">
            <Typography
              variant="h4"
              align="center"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              {move ?"Welcome Back !":"New Here ?" }
            </Typography>
            <Typography
              paragraph
              align="center"
              sx={{ color: "#fff", mt: 2, padding: "0 30px" }}
            >
            {move ?"To keep connected with us please login with your personal info.": " Signup and discover a completly new way of managing your tasks."}
            </Typography>

            <Button
            style={style.Button}
              variant="outlined"
              onClick={() => {
                move ? setMove("") : setMove("reverse");

                console.log(move);
              }}
              
              sx={{
                color: "#fff",
                borderColor: "#fff",
                "&:hover": {
                  bgcolor: "#fff",
                  borderColor: "#fff",
                  opacity: "0.8",
                  color: "#000",
                },
              }}
            >
              {move ? 'Sign In': 'Sign Up'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

const style = {
  Box: {
    background: "linear-gradient(to left, #91eae4, #86a8e7, #7f7fd5)",
    width: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    p: 4,
  },
  Button: {
    margin: "0.8rem 0",
    borderRadius: "2rem",
    padding: "1rem 0.8rem",
    width: "15rem",
    textTransform: "none",
  },
};

export default Formcontainer;
