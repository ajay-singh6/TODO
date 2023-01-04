import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { getCookie } from "../Cookies/getCookies";
import { endpoint } from "../endpoints";

axios.defaults.withCredentials = true;

function Login( {isAuthenticated, setIsAuthenticated, data, setData} ) {
  const navigate = useNavigate();

  const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

  useEffect(()=> {
    if(isAuthenticated) {
      setData({ ...data });

      console.log("useEffect : " + data);
      navigate("/todo");

    }
  }, [data, isAuthenticated, navigate, setData]);

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

    // Eamil validation
    if (!data.email.value) {
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
    } else if (!data.password.value) {
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
      setData({ ...data });

      console.log("Login (data): " + data);
      axios
        .post(`${endpoint.baseUrl}${endpoint.signIn}`, {
          email: data.email.value,
          password: data.password.value,
        })
        .then((res) => {
          // setUser({ ...res.data });
          // console.log("Res.data : " + res.data);
          console.log("Cookie : " + getCookie('jwt'));

          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/todo");
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
          <Box sx={{ heigh: "100vh", width: "60%", padding: "20px 4rem" }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", marginTop: "4rem" }}
            >
              Login to Your Account
            </Typography>
            {/* Login form */}
            <Box
              component="form"
              noValidate
              sx={{ mt: 4, width: "80%", textAlign: "center" }}
              onSubmit={submitHandler}
            >
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
                  autoFocus
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
                style={style.button}
                type="submit"
                variant="contained"
                size="medium"
                sx={{
                  width: "15vw",
                  bgcolor: "#7f7fd5",

                  color: "#FFF",
                  "&:hover": {
                    bgcolor: "#7f7fd5",
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
            <Grid container width="80%">
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Box style={style.Box}>
            <Typography
              variant="h4"
              align="center"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              New Here ?
            </Typography>
            <Typography
              paragraph
              align="center"
              sx={{ color: "#fff", mt: 2, padding: "0 30px" }}
            >
              Signup and discover a completly new way of managing your tasks.
            </Typography>
            <Button
              style={style.button}
              variant="outlined"
              onClick={() => {
                navigate("/signup");
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
              Sign Up
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
};

export default Login;
