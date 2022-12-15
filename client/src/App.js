import "./App.css";
import Navbar from "./components/Navbar";
import Todolist from "./components/TodoList";
import { createContext, useState } from "react";
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
const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({});
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Todolist />,
    },
    {
      path: "/signin",
      element: <Login />,
    },
    { path: "/signup", element: <Signup /> },
    { path: "/user", element: <PrivateRoute />, children:[{
      path: "/user", element: <Profile/>
    }] },
  ]);

  return (
    <>
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

      {/* <Formcontainer/> */}
      {/* <div className="todo-app">
        <h1 className="todo-heading"> Write Your Task Here.</h1>

        <Todo />
      </div> */}
    </>
  );
}

export default App;
export { UserContext };
