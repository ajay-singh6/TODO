import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


function Home({ isAuthenticated, setIsAuthenticated}) {
    const navigate = useNavigate();

    useEffect(()=> {
        if(localStorage.getItem("user")) {
            setIsAuthenticated(true)
            navigate("/todo")
        } else {
            setIsAuthenticated(false)
            navigate("/signin")
        }
        console.log("Home : " + isAuthenticated);
  }, []);

  console.log("Home page rendered");
  return (
    <>
    </>
  )
}

export default Home