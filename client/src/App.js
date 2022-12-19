import "./App.css";

import Navbar from "./components/Navbar";
import Todolist from "./components/TodoList";
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
import Profile from "./components/Profile";
import PrivateRoute from "./utils/PrivateRoute";
import Signinform from "./components/Signinform";
const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({});
  
  const [data, setData] = useState( {
    email: {
      value: "",
      err: false,
      errMsg: "",
    },
  
    password: {
      value: "",
      err: false,
      errMsg: "",
    }
  });
  
  //search for token
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(()=> {
    if(localStorage.getItem("user")) {
      setIsAuthenticated(true)
    } else setIsAuthenticated(false)
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Todolist isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/> : <Login data={data} setData={setData}/>,
    },
    {
      path: "/todo",
      element:  <Todolist isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: "/signin",
      element: <Login data={data} setData={setData}/>,
    },
    { path: "/signup", element: <Signup /> },
    { path: "/user", element: <PrivateRoute isAuthenticated/>, children:[{
      path: "/user", element: <Profile/>
    }] },
  ]);

  return (

    <div className="main">
      {/* <Navbar /> */}
      {/* <Todo /> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todolist />}>
            {" "}
          </Route>
          <Route path="/signin" element={<Formcontainer login={""} />}>
            {" "}
          </Route>
          <Route path="/signup" element={<Formcontainer login={"reverse"} />}>
            {" "}
          </Route>
        </Routes>
      </BrowserRouter> */}
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router}></RouterProvider>
      </UserContext.Provider>
      {/* <Signinform /> */}

      {/* <Formcontainer/> */}
      {/* <div className="todo-app">
        <h1 className="todo-heading"> Write Your Task Here.</h1>

          <Todo />
        </div> */}
      {/* <Profile /> */}
    </div> 
    
  );
}

export default App;
export { UserContext };
