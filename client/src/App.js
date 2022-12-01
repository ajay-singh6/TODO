import "./App.css";
import Todo from "./components/ToDo";
import Formcontainer from "./components/Formcontainer";
import Navbar from "./components/Navbar";
import Todolist from "./components/TodoList";
import { createContext, useState } from "react";

const AppContext = createContext(null);

function App() {
  const [todo, setTodo] = useState([]);

  return (
    <>
      <AppContext.Provider value={{ todo, setTodo }}>
        <Navbar></Navbar>
        <Todolist />
      </AppContext.Provider>

      {/* <Formcontainer/> */}
      {/* <div className="todo-app">
        <h1 className="todo-heading"> Write Your Task Here.</h1>

        <Todo />
      </div> */}
    </>
  );
}

export default App;
export { AppContext };
