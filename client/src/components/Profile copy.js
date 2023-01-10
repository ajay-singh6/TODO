import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { endpoint } from "../endpoints";
import { useNavigate } from "react-router-dom";
// Get the image URL
import DP from '../assets/images/img.jpg'; 
import "../assets/css/profile.css";
import Navbar from './Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import excludeVariablesFromRoot from '@mui/material/styles/excludeVariablesFromRoot';

axios.defaults.withCredentials = true;

const Profile = ( {isAuthenticated, setIsAuthenticated} ) => {
    
    const navigate = useNavigate();

    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

    const [userDetails, setUserDetails ] = useState({
        name:"",
        email:"",
    });

    const [data, setData] = useState({
        name: { value: "", err: false, errMsg: "" },
        email: { value: "", err: false, errMsg: "" },
        password: { value: "", err: false, errMsg: "" },
        confirmPassword: { value: "", err: false, errMsg: "" }
    });

    const [tData, settData] = useState(data);
    
    useEffect(()=>{
        const token = Cookies.get('jwt');
        axios
            .get(`${endpoint.baseUrl}${endpoint.user}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setData({...data, 
                    name:{ value: res.data.name,err: false, errMsg: "" }, 
                    email:{ value: res.data.email,err: false, errMsg: "" }
                })
                settData({...tData, 
                    name:{ value: res.data.name,err: false, errMsg: "" }, 
                    email:{ value: res.data.email,err: false, errMsg: "" }
                })
                setUserDetails({...userDetails, name: res.data.name, email: res.data.email
                })
                console.log("res : ", res);
            })
            .catch((err) => {
                console.log("err : ", err);}
            )


    },[ ])
    
    const saveDetails = () => {

        if (!data.name.value) {
            setData((preData) => ({
                ...preData,
                name: {
                ...data.name,
                err: true,
                errMsg: "Name is required",
                },
            }));
        } // Email validation
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
        } else {
            const token = Cookies.get('jwt');
            axios
                .put(`${endpoint.baseUrl}${endpoint.user}`, {
                    name: tData.name.value,
                    email: tData.email.value
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            setData({...tData})
            setUserDetails({...userDetails, name: tData.name.value, email: tData.email.value})
            alert("User Details Changed Successfully.!!")
            setEdit(!edit)
        }
    }

    const [edit, setEdit] = useState(true);

    const toggleEdit = () => {
        setEdit(!edit);
    }

    const handleCancel = () => {
        setEdit(true);
        settData({...data})
    }

    const inputHandler = (e) => {
        settData({
            ...tData,
            [e.target.name]: {
                value: e.target.value,
                err: false,
                errMsg: "",
            },
        });
    };
    
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
                    alert("Password changed Successfully.!!")
                    setIsAuthenticated(true);
                    navigate("/devProfile");
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
    
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index)
    }
    
  return (
    <>
    <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    <Box  className='profile-container' >
        <Box className='profile-sidebar' >
            <Box className='profile-image-set'>
                <img src={DP} alt='Profile' height= "220px" className='profile-image' />
                <Box className="profile-edit">
                    <label htmlFor="file" >
                        <i className="fas fa-camera"></i>
                        
                    </label> 
                    <input type="file" id="file" accept="image/*"/>
                </Box>
            </Box>
                
            <Typography align="center" sx={{mt: 1}} variant="h5" fontWeight={500} >{userDetails.name}</Typography>
            <Typography align="center" variant="subtitle1">{userDetails.email}</Typography>
            <Box className="bloc-tabs">
                <Box
                onClick={() => toggleTab(1)} 
                className={toggleState === 1 ? "tabs active-tabs" : "tabs" }
                >Public Profile</Box>
                <Box 
                onClick={() => toggleTab(2)} 
                className={toggleState === 2 ? "tabs active-tabs" : "tabs" }
                >Password</Box>
            </Box>

        </Box>
        <Box className='profile-main' >
            <Typography variant='h5' fontWeight={500} className='profile-header'>

                {toggleState === 1 ? "Public Profile" : "Password"}

            </Typography>
            <hr />
            <Box className='profile-content'>
                <Box className={toggleState === 1 ? "content active-content" : "content"}>
                    <Typography variant="p" fontWeight={"bold"} sx={{m: 1.6}} >Basics: </Typography>
                    <TextField  disabled={edit} sx={{m: 1.5}} 
                        placeholder={data.name.value} 
                        onChange={inputHandler} 
                        error={tData.name.err}
                        helperText={tData.name.errMsg}
                        value={tData.name.value}
                        name='name'
                    ></TextField>
                    <TextField  disabled={edit} sx={{m: 1.5}} 
                        placeholder={data.email.value} 
                        onChange={inputHandler} 
                        error={tData.email.err}
                        helperText={tData.email.errMsg}
                        value={tData.email.value}
                        name='email'
                    ></TextField>

                    <Box>
                        {!edit ? <>
                            <Button variant="contained" sx={{m: 1.3, width: 'fit-content'}} onClick={saveDetails}
                            >Submit</Button>
                            <Button variant="outlined" color="error" onClick={handleCancel}>Cancel</Button> </>
                        : 
                            <Button variant="contained" sx={{m: 1.3, width: 'fit-content'}} onClick={toggleEdit}
                            >Edit</Button>
                        }
                    </Box>
                </Box>
                
                <Box className={toggleState === 3 ? "content active-content" : "content"}>
                    <h2>Content 2</h2>
                    <hr />
                    <p>
                        Explore Shows
                        SET Shows
                        SAB Shows
                        Marathi Shows
                        Kids
                        Aath Shows
                        English TV Shows
                        Shows by Genres
                        Drama
                        Comedy
                        Thriller
                        Romantic
                        Reality
                        Movies by Language
                        Hindi
                        English Movies
                        Marathi
                    </p>
                </Box>
                <Box className={toggleState === 2 ? "content active-content" : "content"}>
                    <Typography variant="p" fontWeight={"bold"} sx={{m: 1.6}} >Change Password: </Typography>
                    <TextField  sx={{m: 1.5}} 
                        placeholder={"Change Password"} 
                        onChange={inputHandler} 
                        type="password" 
                        error={data.password.err}
                        helperText={data.password.errMsg}
                        value={data.password.value}
                        name='password'
                    ></TextField>
                    <TextField  sx={{m: 1.5}} 
                        placeholder={"Confirm Password"} 
                        onChange={inputHandler} 
                        type="password" 
                        error={data.confirmPassword.err}
                        helperText={data.confirmPassword.errMsg}
                        value={data.confirmPassword.value}
                        name='confirmPassword'></TextField>
                    <Box>
                        <Button variant="contained" sx={{m: 1.3, width: 'fit-content'}} onClick={(e) => {changePassword(e)}}
                        >Change Password</Button>
                    </Box>
                    
                </Box>

            </Box>

        </Box>
    </Box>
    </>
  )
}

export default Profile