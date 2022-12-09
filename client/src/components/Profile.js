import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

// Get the image URL
import DP from '../images/img.jpg'; 

import "../assets/profile.css";


const Profile = () => {

    const [data, setData] = useState({
        firstName: "Mohammed Farooq",
        lastName: "Ahmed",
        designation: "Software Engineer",
    });
    
    const [tempData, setTempData] = useState({
        firstName: data.firstName,
        lastName: data.lastName,
        designation: data.designation,
    });

    const [edit, setEdit] = useState(true);

    const inputHandler = (e) => {
      setTempData((tempData) => ({ ...tempData, [e.target.name]: e.target.value }));
    };

    const saveDetails = () => {
        if(!edit) {
            setData((data) => ({...tempData}))
        }
        setEdit(!edit)
    }

  return (
    <div  className='profile-container' >
            <div className='profile-sidebar' >
                <div className='profile-image-set'>
                    <img src={DP} alt='Profile' height= "260px" className='profile-image' />
                    <div class="profile-edit">
                        <label for="file" >
                            <i class="fas fa-camera"></i>
                        </label> 
                        <input type="file" id="file" accept="image/*"/>
                    </div>
                </div>
                    
                <Typography align="center" sx={{mt: 1.6}} variant="h5" fontWeight={500} >{data.firstName} {data.lastName}</Typography>
                <Typography align="center"  sx={{mt: 1.6}} variant="subtitle1">{data.designation}</Typography>
            </div>
            <div className='profile-main' >
                <Typography variant='h5' fontWeight={500} className='profile-header'>Public Profile</Typography>
                <hr />
                <div className='profile-content'>
                    <Typography variant="p" fontWeight={"bold"} sx={{m: 1.6}} >Basics: </Typography>
                    <TextField className='textField' disabled={edit} sx={{m: 1.5}} placeholder={data.firstName} onChange={inputHandler} name='firstName'></TextField>
                    <TextField className='textField' disabled={edit} sx={{m: 1.5}} placeholder={data.lastName} onChange={inputHandler} name='lastName'></TextField>
                    <TextField className='textField' disabled={edit} sx={{m: 1.5}} placeholder={data.designation} onChange={inputHandler} name='designation'></TextField>
                    <Button variant="contained" sx={{m: 1.3, width: 'fit-content'}} onClick={saveDetails}> {edit ? "Edit" : "Save"}</Button>
                </div>

            </div>
    </div>
  )
}

export default Profile