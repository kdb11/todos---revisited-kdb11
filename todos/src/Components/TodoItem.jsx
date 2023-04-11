import React from "react";

export default function TodoItem(props) {
  const { todo, toggleTodoHandler, removeTodoHandler } = props;

  const handleToggle = () => {
    toggleTodoHandler(todo.id);
  };

  const handleRemove = () => {
    removeTodoHandler(todo.id);
  };

  return (
    <li>
      <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>
        {todo.text}
      </span>
      <button onClick={handleToggle}>
        {todo.completed ? "Incomplete" : "Complete"}
      </button>
      <button onClick={handleRemove}>Remove</button>
    </li>
  );
}