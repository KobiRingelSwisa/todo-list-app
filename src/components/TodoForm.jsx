import React, { useState } from "react";
import logo from "../assets/logo.png";

export default function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <>
      <div className="form-div">
        <img src={logo} alt="logo" className="form-logo" />
        <h2>Add Todo</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Insert a new Todo"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </>
  );
}
