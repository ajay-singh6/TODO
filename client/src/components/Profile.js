import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

// Get the image URL
import DP from '../assets/images/img.jpg'; 

import "../assets/css/profile.css";
import Navbar from './Navbar';
import { UserContext } from '../App';
import axios from 'axios';


const Profile = () => {

    const {id} = useContext(UserContext)
    const [data, setData] = useState({
        name: "",
        password: "",
        email: "",
    });

    useEffect(()=>{
        axios.get(`http:localhost:3000/api/user${id}`).then(res =>{
           console.log(res) 
        })
    },[])

    
    

    const [edit, setEdit] = useState(true);

    const inputHandler = (e) => {
      setData((tempData) => ({ ...data, [e.target.name]: e.target.value }));
    };

    const saveDetails = () => {
        if(!edit) {
            setData((data) => ({...data}))
        }
        setEdit(!edit)
    }

  return (
    <>
    <Navbar/>
    <Box  className='profile-container' >
            <Box className='profile-sidebar' >
                <Box className='profile-image-set'>
                    <img src={DP} alt='Profile' height= "260px" className='profile-image' />
                    <Box class="profile-edit">
                        <label for="file" >
                            <i class="fas fa-camera"></i>
                        </label> 
                        <input type="file" id="file" accept="image/*"/>
                    </Box>
                </Box>
                    
                <Typography align="center" sx={{mt: 1.6}} variant="h5" fontWeight={500} >{data.name} {data.password}</Typography>
                <Typography align="center"  sx={{mt: 1.6}} variant="subtitle1">{data.email}</Typography>
            </Box>
            <Box className='profile-main' >
                <Typography variant='h5' fontWeight={500} className='profile-header'>Public Profile</Typography>
                <hr />
                <Box className='profile-content'>
                    <Typography variant="p" fontWeight={"bold"} sx={{m: 1.6}} >Basics: </Typography>
                    <TextField  disabled={edit} sx={{m: 1.5}} placeholder={data.password} onChange={inputHandler} name='lastName'></TextField>
                    <TextField  disabled={edit} sx={{m: 1.5}} placeholder={data.name} onChange={inputHandler} name='firstName'></TextField>
                    <TextField  disabled={edit} sx={{m: 1.5}} placeholder={data.email} onChange={inputHandler} name='designation'></TextField>
                    <Button variant="contained" sx={{m: 1.3, width: 'fit-content'}} onClick={saveDetails}> {edit ? "Edit" : "Save"}</Button>
                </Box>

            </Box>
    </Box>
    </>
  )
}

export default Profile