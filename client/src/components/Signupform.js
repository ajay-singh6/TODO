import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import "../assets/Formcontainer.css";

function Signupform() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setData({...data,[e.target.name]: e.target.value})
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    console.log(data)
  }
  return (
    <>
      <Box
        sx={{
          heigh: "100vh",
          width: "60%",
          padding: "20px 4rem",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", marginTop: "4rem" }}>
          Create Account
        </Typography>
        {/* Login form */}
        <Box
          component="form"
          noValidate
          onSubmit={submitHandler}
          sx={{ mt: 2, width: "80%", textAlign: "center" }}
        >
          <div className="TextField-without-border-radius">
            <TextField
              margin="normal"
              required
              fullWidth
              size="mid"
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={data.name}
              onChange={inputHandler}
            />
          </div>
          <div className="TextField-without-border-radius">
            <TextField
              margin="normal"
              required
              fullWidth
              size="mid"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={data.email}
              onChange={inputHandler}
            />
          </div>
          <div className="TextField-without-border-radius">
            <TextField
              margin="normal"
              required
              fullWidth
              size="mid"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={inputHandler}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            style={style.button}
            sx={{
              width: "15vw",
              bgcolor: "#7f7fd5",
              color: "#FFF",
              "&:hover": {
                bgcolor: "#7f7fd5",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </>
  );
}

const style = {
  Button: {
    margin: "0.8rem 0",
    borderRadius: "2rem",
    padding: "1rem 0.8rem",
    width: "15rem",
    textTransform: "none",
  },
  button: {
    margin: "0.8rem 0",
    borderRadius: "2rem",
    padding: "1rem 0.8rem",
    width: "15rem",
    textTransform: "none",
  },
};

export default Signupform;
