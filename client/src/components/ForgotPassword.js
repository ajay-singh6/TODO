import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { endpoint } from "../endpoints";

axios.defaults.withCredentials = true;

function ForgotPassword( {isAuthenticated, setIsAuthenticated} ) {
    const navigate = useNavigate();

    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

    const [data, setData] = useState({
        email: { value: "", err: false, errMsg: "" },
        password: { value: "", err: false, errMsg: "" },
        confirmPassword: { value: "", err: false, errMsg: "" },
        otp: { value: "", err: false, errMsg: "" }
    });

    const [ verify, setVerify ] = useState(false);
    const [ changePW, setChangePW ] = useState(false);

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

    const verifyHandler = () => {
        console.log("Verify : ", data);
        if (!data.otp.value) {
            setData((preData) => ({
                ...preData,
                otp: {
                ...data.otp,
                err: true,
                errMsg: "passwordotp is required",
                },
            }));
        } else {
            axios
                .post(`${endpoint.baseUrl}${endpoint.forgotPasswordVerify}`, {
                    email: data.email.value,
                    otp: data.otp.value,
                })
                .then((res) => {
                    // Todo : routing 
                    axios.defaults.withCredentials = true;
                    if (res.status >= 200 && res.status <= 210) {
                        alert("Account Verified successfully!!")
                        setVerify(!verify); 
                        setChangePW(true);
                        
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
    }

    const submitHandler = (e)=> {
        e.preventDefault();
        console.log("Submit : ", data);

        if (!data.email.value) {
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
        } else {
            axios
                .post(`${endpoint.baseUrl}${endpoint.forgotPassword}`, {
                    email: data.email.value
                })
                .then((res) => {
                    console.log(res);
                    setVerify(!verify);
                })
                .catch((err) => {
                    console.log(err.response);
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
    }

    const changePassword =(e) => {
        e.preventDefault();
        if (!data.password.value) {
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
        } else if (!data.confirmPassword.value) {
            setData((preData) => ({
                ...preData,
                confirmPassword: {
                ...data.confirmPassword,
                err: true,
                errMsg: "password is required",
                },
            }));
        } else if (!passwordRegx.test(data.confirmPassword.value)) {
            setData((preData) => ({
                ...preData,
                confirmPassword: {
                ...data.confirmPassword,
                err: true,
                errMsg:
                    "password must contain 8 charcter with one uppercase letter, one lowercase letter and one Number",
                },
            }));
        } else if(data.password.value !== data.confirmPassword.value) {
            setData((preData) => ({
                ...preData,
                confirmPassword: {
                ...data.confirmPassword,
                err: true,
                errMsg:
                    "Password must be same!!",
                },
            }));
        } else {
            const token = Cookies.get('jwt')
            console.log(token);
            console.log(data);
            axios
                .put(`${endpoint.baseUrl}${endpoint.changePassword}`, {
                        password: data.password.value
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    localStorage.setItem("user", "Ok");
                    setIsAuthenticated(true);
                    navigate("/todo")
                })
                .catch((err) => {
                    console.log(err);
                    setData((preData) => ({
                        ...preData,
                        [err.response.data.param]: {
                        ...data[err.response.data.param],
                        err: true,
                        errMsg: err.response.data.msg,
                        },
                    }));
                })

        }
    }


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
            <Box sx={{ heigh: "100vh", width: "100%", padding: "20px 4rem" }}>
                <Typography
                variant="h3"
                sx={{ fontWeight: "bold", marginTop: "4rem" }}
                >
                {changePW ? 'Change Password' : 'Verify user'}
                </Typography>
                {/* Login form */}
                <Box
                component="form"
                noValidate
                sx={{ mt: 4, width: "100%", textAlign: "center" }}
                // onSubmit={changePassword}
                >
                { changePW ? 
                    (<>
                        <div className="TextField-without-border-radius">
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            size="mid"
                            id="Password"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="password"
                            autoFocus
                            error={data.password.err}
                            helperText={data.password.errMsg}
                            value={data.password.value}
                            onChange={inputHandler}
                            />
                        </div>
                        <div className="TextField-without-border-radius">
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            size="mid"
                            id="confirmPassword"
                            type="password"
                            label="confirmPassword"
                            name="confirmPassword"
                            autoComplete="confirmPassword"
                            autoFocus
                            error={data.confirmPassword.err}
                            helperText={data.confirmPassword.errMsg}
                            value={data.confirmPassword.value}
                            onChange={inputHandler}
                            />
                        </div>
                        <Button
                            style={style.button}
                            type='submit'
                            onClick={(e) => changePassword(e)}
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
                            Change Password
                        </Button>

                    </>) : 
                (<>
                    { !verify ? 
                        (   <>
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
                                <Button
                                    style={style.button}
                                    // type="submit"
                                    onClick={(e) => {submitHandler(e)}}
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
                                    Submit
                                </Button>
                            </>
                        ) : 
                        (   <>
                                <div className="TextField-without-border-radius">
                                    <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    size="mid"
                                    name="otp"
                                    label="Otp"
                                    type="text"
                                    id="otp"
                                    autoComplete="otp"
                                    error={data.otp.err}
                                    helperText={data.otp.errMsg}
                                    value={data.otp.value}
                                    onChange={inputHandler}
                                    />
                                </div>
                                <Button
                                    style={style.button}
                                    onClick={verifyHandler}
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
                                    Verify
                                </Button>
                            </>
                        )
                    }

                </>)}
                
                </Box>
                <Grid container >
                
                    <Grid item sx={{mt: 4, width: "100%", textAlign: "center" }}>
                        <Link href="#" to="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>

            </Paper>
        </Box>
        </>
    )
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

export default ForgotPassword