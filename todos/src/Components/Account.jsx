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
          const todo = await contract.methods.todos(indexes[i]).call;
          console.log(todo);
          todoList.push(todo);
        }

        setTodos(todoList);
    };

    const html = todos.map((todo) => {
        return(
            <ul>
            <li>{todo.id}</li>
            <li>{todo.text}</li>
            <li>{todo.completed}</li>
        </ul>
        );
    });

    const createTodo = async (todo) => {
        await contract.methods
        .createTodo(todo.titel)
/*         await contract.methods.createTodo(todo.id)
        await contract.methods.createTodo(todo.completed) */
        .send({from: account})
        .once("reciept", async (reciept) => {
            console.log(reciept);

            populateTodos(contract);
        })
    }
    

    return <div>
        <p>Account: {account}</p>
        <AddTodoForm addTodo={createTodo} ></AddTodoForm>
        {html}
    </div>
};