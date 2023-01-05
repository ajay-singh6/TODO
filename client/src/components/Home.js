import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


function Home({ isAuthenticated, setIsAuthenticated}) {
    const navigate = useNavigate();

    useEffect(()=> {
        if(Cookies.get('jwt')) {
            // localStorage.setItem("token", getCookie('jwt'))
            setIsAuthenticated(true)
            navigate("/todo")
        } else {
            setIsAuthenticated(false)
            navigate("/signin")
        }
  }, [isAuthenticated, navigate, setIsAuthenticated]);

  // console.log("Home page rendered");
  return (
    <>
    </>
  )
}

export default Home