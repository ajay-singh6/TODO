import "./App.css";
import Todo from "./components/ToDo";
import TodoList from "./components/TodoList";
import Formcontainer from "./components/Formcontainer";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="main">
      <Navbar />
      {/* <TodoList/> */}
      {/* <Formcontainer/> */}
        {/* <div className="todo-app">
          <h1 className="todo-heading"> Write Your Task Here.</h1>

          <Todo />
        </div> */}
      <Profile />
    </div>
    
  );
}

export default App;
