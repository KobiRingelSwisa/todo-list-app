import React, { useState } from "react";
import ToDo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import Header from "./components/Header";

function App() {
  const [todos, setTodos] = useState([
    { text: "Learn React", isCompleted: false },
    { text: "Build ToDo App", isCompleted: false },
    { text: "Deploy to server", isCompleted: false },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

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
      <Header />
      <div className="app">
        <div className="todo-list">
          {todos.map((todo, index) => (
            <ToDo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))}
          <TodoForm addTodo={addTodo} />
        </div>
      </div>
    </>
  );
}

export default App;
