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
      <span class="textTodo">
        {todo.text}
      </span>

      <button class="compBtn" onClick={handleToggle}>
        {todo.completed ? "Incomplete" : "Complete"}
      </button>

      <button class="removeBtn" onClick={handleRemove}>Remove</button>
    </li>
  );
}