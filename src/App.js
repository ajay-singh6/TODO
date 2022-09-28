import "./App.css";
import Todo from "./components/ToDo";

function App() {
  return (
    <>
      <div className="todo-app">
        <h1 className="todo-heading"> Write Your Task Here.</h1>

        <Todo />
      </div>
    </>
  );
}

export default App;
