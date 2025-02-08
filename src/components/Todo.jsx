import React from "react";

function ToDo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div>
      <span style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
        {todo.text}
      </span>
      <div>
        <button onClick={() => completeTodo(index)}>Completed</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

export default ToDo;
