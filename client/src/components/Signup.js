import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../endpoints";

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: { value: "", err: false, errMsg: "" },
    email: { value: "", err: false, errMsg: "" },
    password: { value: "", err: false, errMsg: "" },
    otp: { value: "", err: false, errMsg: "" }
  });

  const [ verify, setVerify ] = useState(false);

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

  const resetData = () => {
    setData( (preData) => ({
      ...preData,
      name: { value: "", err: false, errMsg: "" },
      email: { value: "", err: false, errMsg: "" },
      password: { value: "", err: false, errMsg: "" },
      otp: { value: "", err: false, errMsg: "" }
  }))}

  const verifyHandler = () => {
      axios
        .post(`${endpoint.baseUrl}${endpoint.verify}`, {
          email: data.email.value,
          otp: data.otp.value,
        })
        .then((res) => {
          // Todo : routing 
          
          if (res.status >= 200 && res.status <= 210) {
            alert("Account added successfully!!")
            resetData();
            setVerify(false); 
            navigate("/signin");
          } else {
            alert("Error..!");
          }
        })
        .catch((err) => {
          console.log(err.response.data.param);
          setData((preData) => ({
            ...preData,
            otp: {
              ...data.otp,
              err: true,
              errMsg: "Wrong Otp",
            },
          }));
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
          password: data.password.value
        })
        .then((res) => {
          setVerify(true); 
        })
        .catch((err) => {
          console.log(err);
          setData((preData) => ({
            ...preData,
            email: {
              ...data.email,
              err: true,
              errMsg: err.response.data.msg,
            },
          }));
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
            transition: "all 2s ease-in",
          }}
          elevation={3}
        >
          {/* form container */}
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
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", marginTop: "4rem" }}
            >
              Create Account
            </Typography>
            {/* Login form */}
            <Box
              component="form"
              noValidate
              // onSubmit={verifyHandler}
              sx={{ mt: 2, width: "80%", textAlign: "center" }}
            >
              { !verify ? ( <>
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
                // type="submit"
                onClick={(e) => {submitHandler(e)}}
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
              </>
              ) :
                <>
              <div className="TextField-without-border-radius">
              <TextField
                margin="normal"
                required
                fullWidth
                size="mid"
                id="otp"
                label="Otp"
                name="otp"
                autoComplete="otp"
                autoFocus
                error={data.otp.err}
                helperText={data.otp.errMsg}
                value={data.otp.value}
                onChange={inputHandler}
              />
            </div>
              <Button
                // type="submit"
                onClick={() => {verifyHandler()}}
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
                Verify
              </Button>
              <Button
                onClick={() => {setVerify(false)}}
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
                }}>
                Go Back
              </Button>

            </>
              }
            </Box>
          </Box>
          {/* right side container */}
          <Box style={style.Box}>
            <Typography
              variant="h4"
              align="center"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              Welcome Back !
            </Typography>
            <Typography
              paragraph
              align="center"
              sx={{ color: "#fff", mt: 2, padding: "0 30px" }}
            >
              To keep connected with us please login with your personal info.
            </Typography>
            <Button
              style={style.button}
              variant="outlined"
              onClick={() => {
                navigate("/signin")
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
              Sign In
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
  button: {
    margin: "0.8rem 0",
    borderRadius: "2rem",
    padding: "1rem 0.8rem",
    width: "15rem",
    textTransform: "none",
  },
  Button: {
    margin: "0.8rem 0",
    borderRadius: "2rem",
    padding: "1rem 0.8rem",
    width: "15rem",
    textTransform: "none",
  },
};

export default Signup;
