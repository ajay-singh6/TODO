import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getCookie } from '../Cookies/getCookies';


function Home({ isAuthenticated, setIsAuthenticated}) {
    const navigate = useNavigate();

    useEffect(()=> {
        if(getCookie('jwt')) {
            // localStorage.setItem("token", getCookie('jwt'))
            setIsAuthenticated(true)
            navigate("/todo")
        } else {
            setIsAuthenticated(false)
            navigate("/signin")
        }
        // console.log("Home : " + isAuthenticated);
  }, [isAuthenticated, navigate, setIsAuthenticated]);

  // console.log("Home page rendered");
  return (
    <>
    </>
  )
}

export default Home