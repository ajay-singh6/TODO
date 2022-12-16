import axios from "axios";
// import { Navigate, useNavigate } from 'react-router-dom';
import { endpoint } from "../endpoints";

const addTodo = (todos, newTodo, setTodo, userId, setOpen) => {
  // newTodo.id = uuid();

  const localUser = JSON.parse(localStorage.getItem("user"));

  // console.log(userId)
  if (localUser.id && userId) {
    if (
      newTodo.title !== null &&
      newTodo.discription !== null &&
      newTodo.color !== null
    ) {
      console.log(localUser.id);
      const {id} = localUser
      axios
        .post(
          
          `${endpoint.baseUrl}${endpoint.todo}`,
          { ...newTodo, id },
          {
            headers: {
              Authorization: `Bearer ${localUser.token}`,
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
    } 
  }else {
    console.log("hello");
    setOpen(true);
  }
};

const removeTodo = (todos, setTodo, TodoId) => {
  const { id, token } = JSON.parse(localStorage.getItem("user"));
  axios
    .delete(`${endpoint.baseUrl}${endpoint.todo}/${id}/${TodoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const updatedTodo = todos.filter((t) => t._id !== TodoId);
      // console.log(newTodos);
      setTodo(updatedTodo);
    })
    .catch((err) => console.log(err));
  // const updatedTodo = todos.filter((t) => t._id !== TodoId);
  // console.log(todos);
  // setTodo(updatedTodo);
};

const editTodo = (todos, setTodo, TodoId, newValues) => {
  const { id, token } = JSON.parse(localStorage.getItem("user"));

  axios
    .put(
      `${endpoint.baseUrl}${endpoint.todo}/${id}/${TodoId}`,
      { newValues },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      const newTodos = todos.map((t) =>
        t._id !== TodoId ? t : { TodoId, ...res.data.data }
      );
      // console.log(newTodos);
      setTodo(newTodos);
    })
    .catch((err) => console.log(err));
};

export { addTodo, removeTodo, editTodo };
