import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { endpoint } from "../endpoints";

const addTodo = (todos, newTodo, setTodo) => {
  // newTodo.id = uuid();
  const { id, token } = JSON.parse(localStorage.getItem("user"));

  // console.log(userId)
  if (
    newTodo.title !== null &&
    newTodo.discription !== null &&
    newTodo.color !== null
  ) {
    if (id) {
      console.log(id);
      axios
        .post(
          `${endpoint.baseUrl}${endpoint.todo}/${id}`,
          { ...newTodo, id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const { title, description, color, _id } = response.data;
          setTodo((pre) => [{ title, description, color, _id }, ...pre]);

        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please login to create a ToDo");
    }
  }
};

const removeTodo = (todos, setTodo, id) => {
  const updatedTodo = todos.filter((t) => t.id !== id);
  console.log(todos);
  setTodo(updatedTodo);
};

const editTodo = (todos, setTodo, id, newValues) => {
  const newTodos = todos.map((t) => (t.id !== id ? t : { id, ...newValues }));
  setTodo(newTodos);
};

export { addTodo, removeTodo, editTodo };
