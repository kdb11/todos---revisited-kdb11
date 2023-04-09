import { useEffect, useState } from "react";
import Web3 from "web3";
import { TODOS_LIST_ADRESS, TODO_LIST_ABI } from "../config";
import { AddTodoForm } from "./AddTodoForm";

export function Account() {
    const [account, SetAccount] = useState();
    const [contract, SetContract] = useState();
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        const getAccounts = async () => {
            const web3 = new Web3(Web3.givenProvide || "http://localhost:7545");
            const accounts = await web3.eth.getAccounts();

            console.log(accounts);
            SetAccount(accounts[0]);

            const todoContract = new web3.eth.Contract(TODO_LIST_ABI, TODOS_LIST_ADRESS);

            SetContract(todoContract);

            await populateTodos(todoContract);
            
        };


        if(account) return;
        getAccounts();
    });

    const populateTodos = async (contract) => {
        let indexes = await contract.methods.todoCount().call();

        console.log(indexes);

        let todoList = [];

        for (let i = 0; i < indexes.length; i++) {
          const todo = await contract.methods.todos(indexes[i]).call();
          console.log(todo);
          todoList.push(todo);
        }

        setTodos(todoList);
    };

    const createNewTodo = async (todo) => {
        await contract.methods
          .createTodo(JSON.stringify(todo.titel, todo.date, todo.stage))
          .send({ from: account })
          .once("receipt", async (receipt) => {
            console.log(receipt);

            /* setTodos([...todos, todo]); */
    
            populateTodos(contract);
          });
      };

      const html = todos.map((todo) => {
        return(
            <ul key={todo.id}>
            <li>{todo.id}</li>
            <li>{todo.text}</li>
            <li>{todo.completed.toString()}</li>
        </ul>
        );
    });
    

    return ( 
        <div>
            <p>Account: {account}</p>
            <AddTodoForm addTodo={createNewTodo} ></AddTodoForm>
            {html}
        </div>
    );
};