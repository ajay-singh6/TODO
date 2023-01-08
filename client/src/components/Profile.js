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
    
    const {id} = useContext(UserContext)

    
    const [data, setData] = useState({
        name: "",
        password: "***",
        email: "",
    });
    const [tData, settData] = useState({data});
    
    useEffect(()=>{
        if(isAuthenticated) {
            setData({...data, name: Cookies.get('name'), email: Cookies.get('email')})
            settData({...data})
        }
    },[isAuthenticated])
    

    const [edit, setEdit] = useState(true);

    const inputHandler = (e) => {
      settData({ ...tData, [e.target.name]: e.target.value });
    };

    const resetData = (e) => {
        settData( (preData) => ({
            ...preData,
            name: "",
            email: "",
            password: "",
        }))
    }
    
    const saveDetails = () => {
        if(!edit) {
            setData({...tData})
        }
        setEdit(!edit)
    }
    
    const changePassword = () => {
        console.log("changePassword");
        console.log("changePassword");
    }

    const restoreDetails = () => {
        settData({...data})
        setEdit(!edit)
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
                    {/* <TextField  disabled={edit} sx={{m: 1.5}} placeholder={data.password} onChange={inputHandler} name='password'></TextField> */} 
                    <Box>
                        <Button variant="outlined" sx={{m: 1.3, width: 'fit-content'}} onClick={changePassword}> Change password</Button>
                        {!edit ? 
                            <>
                                <Button variant="outlined" sx={{m: 1.3, width: 'fit-content'}} onClick={saveDetails}>Save</Button> 
                                <Button variant="outlined" sx={{m: 1.3, width: 'fit-content'}} onClick={restoreDetails} color="error">Cancel</Button> 
                            </> : 
                            <>
                                <Button variant="contained" sx={{m: 1.3, width: 'fit-content'}} onClick={() => setEdit(!edit)}>Edit details</Button>
                            </>
                        }
                    </Box>
                </Box>

            </Box>
    </Box>
    </>
  )
}

export default Profile