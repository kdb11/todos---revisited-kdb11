import React, { useState } from "react";

export default function TodoForm(props) {
  const [todoText, setTodoText] = useState("");

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleCreateTodo = (e) => {
    e.preventDefault();
    props.createTodoHandler(todoText);
    setTodoText("");
  };

  return (
    <form onSubmit={handleCreateTodo}>
      <input type="text" value={todoText} onChange={handleInputChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
}