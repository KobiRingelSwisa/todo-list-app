import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import List from "./components/List";
import UserContext from "./UserContext";

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



  return (
    <UserContext.Provider value={{ todos, setTodos }}>
      <TodoForm addTodo={addTodo} />
      <div className="app">
        <div className="todo-list">
          <List />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
