import "./App.css";
import Todo from "./components/ToDo";
import TodoList from "./components/TodoList";
import Formcontainer from "./components/Formcontainer";

import Navbar from "./components/Navbar";
import Todolist from "./components/TodoList";

function App() {
  return (
    <div className="main">
      <Navbar />
      <Todolist/>
      {/* <Formcontainer/> */}
        {/* <div className="todo-app">
          <h1 className="todo-heading"> Write Your Task Here.</h1>

          <Todo />
        </div> */}
    </div>
    
  );
}

export default App;
