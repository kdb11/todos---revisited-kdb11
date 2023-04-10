import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { TODOS_LIST_ADRESS, TODO_LIST_ABI } from "../config";

const web3 = new Web3(Web3.givenProvider);

export function TodoList()  {
  const [todos, setTodos] = useState([]);
  const [account, setAccount] = useState();
  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const todoListContract = new web3.eth.Contract(TODO_LIST_ABI,TODOS_LIST_ADRESS);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const todoCount = await todoListContract.methods.todoCount().call();
      const todosArray = [];
      for (let i = 1; i <= todoCount; i++) {
        const todo = await todoListContract.methods.todos(i).call();
        todosArray.push(todo);
      }
      setTodos(todosArray);
    };
    getTodos();
  }, []);

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    const todoListContract = new web3.eth.Contract(TODO_LIST_ABI,TODOS_LIST_ADRESS);
    await todoListContract.methods.createTodo(todoText).send({ from: account });
    setTodos([...todos, { text: todoText, completed: false }]);
    setTodoText("");
  };

  const handleToggleTodo = async (id) => {
    const todoListContract = new web3.eth.Contract(TODO_LIST_ABI,TODOS_LIST_ADRESS);
    await todoListContract.methods.toggleTodo(id).send({ from: account });
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  const handleRemoveTodo = async (id) => {
    const todoListContract = new web3.eth.Contract(TODO_LIST_ABI,TODOS_LIST_ADRESS);
    await todoListContract.methods.removeTodo(id).send({ from: account });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleCreateTodo}>
        <input type="text" value={todoText} onChange={handleInputChange} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>{todo.text}</span>
            <button onClick={() => handleToggleTodo(todo.id)}>{todo.completed ? "Incomplete" : "Complete"}</button>
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
