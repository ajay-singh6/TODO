import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { endpoint } from "../endpoints";
// Get the image URL
import DP from '../assets/images/img.jpg'; 

import "../assets/css/profile.css";
import Navbar from './Navbar';
import { UserContext } from '../App';
import axios from 'axios';
import Cookies from 'js-cookie';


const Profile = ( {isAuthenticated, setIsAuthenticated} ) => {
    // console.log("Profile" , UserContext);
    const { user, setUser } = useContext(UserContext);
    const {id} = useContext(UserContext)
    const [data, setData] = useState({
        name: "",
        password: "***",
        email: "",
    });
    
    useEffect(()=>{
        if(isAuthenticated) {
            // const localUser = JSON.parse(localStorage.getItem("user"));
            setData({...data, name: Cookies.get('name'), email: Cookies.get('email')})
        }
    },[])

    
    

    const [edit, setEdit] = useState(true);

    const inputHandler = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };

    const saveDetails = () => {
        if(!edit) {
            setData((data) => ({...data}))
        }
        setEdit(!edit)
    }

  return (
    <>
    <Navbar user={user} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
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
                    
                <Typography align="center" sx={{mt: 1.6}} variant="h5" fontWeight={500} >{data.name}</Typography>
                <Typography align="center"  sx={{mt: 1.6}} variant="subtitle1">{data.email}</Typography>
            </Box>
            <Box className='profile-main' >
                <Typography variant='h5' fontWeight={500} className='profile-header'>Public Profile</Typography>
                <hr />
                <Box className='profile-content'>
                    <Typography variant="p" fontWeight={"bold"} sx={{m: 1.6}} >Basics: </Typography>
                    <TextField  disabled={edit} sx={{m: 1.5}} placeholder={data.name} onChange={inputHandler} name='name'></TextField>
                    <TextField  disabled={edit} sx={{m: 1.5}} placeholder={data.email} onChange={inputHandler} name='email'></TextField>
                    <TextField  disabled={edit} sx={{m: 1.5}} placeholder={data.password} onChange={inputHandler} name='password'></TextField>
                    <Button variant="contained" sx={{m: 1.3, width: 'fit-content'}} onClick={saveDetails}> {edit ? "Edit" : "Save"}</Button>
                </Box>

            </Box>
    </Box>
    </>
  )
}

export default Profile