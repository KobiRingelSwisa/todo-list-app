import { useContext } from "react";
import React from "react";
import ToDo from "./Todo";
import UserContext from "../UserContext";

function List() {
  const { todos, setTodos } = useContext(UserContext);

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      {todos.map((todo, index) => (
        <ToDo
          key={index}
          index={index}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
        />
      ))}
    </>
  );
}

export default List;
