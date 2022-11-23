import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { endpoint } from "../endpoints";
import axios from "axios";
import "../assets/Formcontainer.css";

function Signupform() {
  const [data, setData] = useState({
    name: { value: "", err: false, errMsg: "" },
    email: { value: "", err: false, errMsg: "" },
    password: { value: "", err: false, errMsg: "" },
  });

  const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

  const inputHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: {
        value: e.target.value,
        err: false,
        errMsg: "",
      },
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Name Validation

    if (!data.name.value) {
      setData((preData) => ({
        ...preData,
        name: {
          ...data.name,
          err: true,
          errMsg: "Name is required",
        },
      }));
    }
    // Eamil validation
    else if (!data.email.value) {
      console.log("hello");
      setData((preData) => ({
        ...preData,
        email: {
          ...data.email,
          err: true,
          errMsg: "email is required",
        },
      }));
    } else if (!emailRegx.test(data.email.value)) {
      setData((preData) => ({
        ...preData,
        email: {
          ...data.email,
          err: true,
          errMsg: "Invalid email",
        },
      }));
    }

    // Passowrd Validation
    else if (!data.password.value) {
      console.log("hello");
      setData((preData) => ({
        ...preData,
        password: {
          ...data.password,
          err: true,
          errMsg: "password is required",
        },
      }));
    } else if (!passwordRegx.test(data.password.value)) {
      setData((preData) => ({
        ...preData,
        password: {
          ...data.password,
          err: true,
          errMsg:
            "password must contain 8 charcter with one uppercase letter, one lowercase letter and one Number",
        },
      }));
    } else {
      axios
        .post(`${endpoint.baseUrl}${endpoint.signUp}`, {
          name: data.name.value,
          email: data.email.value,
          password: data.password.value,
        })
        .then((res) => {
          // Todo : routing 
        })
        .catch((err) => {
          setData((preData) => ({
            ...preData,
            [err.response.data.param]: {
              ...data[err.response.data.param],
              err: true,
              errMsg: err.response.data.msg,
            },
          }));
        });
    }
  };

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
              error={data.name.err}
              helperText={data.name.errMsg}
              value={data.name.value}
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
              error={data.email.err}
              helperText={data.email.errMsg}
              value={data.email.value}
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
              error={data.password.err}
              helperText={data.password.errMsg}
              value={data.password.value}
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
