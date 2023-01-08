import "./App.css";
import Todolist, { AppContext } from "./components/TodoList";
import { createContext, useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import PrivateRoute from "./utils/PrivateRoute";
import Signinform from "./components/Signinform";
import Cookies from "js-cookie";
import ForgotPassword from "./components/ForgotPassword";
const UserContext = createContext({});

function App() {
  const [user, setUser] = useState({});
  const [todo, setTodo] = useState([]);
  
  //search for token
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=> {
    const token = Cookies.get('jwt');
    if(token) {
      setIsAuthenticated(true);
    } else setIsAuthenticated(false);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>,
    },
    {
      path: "/todo",
      element:  <Todolist isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} setUser={setUser} todo={todo} setTodo={setTodo} />,
    },
    {
      path: "/signin",
      element: <Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />,
    },
    { 
      path: "/forgot-password", 
      element: <ForgotPassword isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> 
    },
    { 
      path: "/signup", element: <Signup /> 
    },
    { 
      path: "/user", element: <PrivateRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />, 
        children:[{
          path: "/user", element: <Profile isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        }] 
    }
    
  ]);

  return (

    <div className="main">
      <UserContext.Provider value={{ user, setUser }}>
        <AppContext.Provider value={{ todo, setTodo }}>
          <RouterProvider router={router}></RouterProvider>
          </AppContext.Provider>
      </UserContext.Provider>
    </div> 
    
  );
}

export default App;
export { UserContext };
