import { useState } from "react"
import { TodoItem } from "../Models/TodoItem"

export const AddTodoForm = ({ addTodo }) => {
    const[todo, setTodo] = useState(new TodoItem(0,"", false));

    const handelChange = (e) => {
        if (e.target.type === "text") {
            setTodo({...todo, [e.target.name]: e.target.value});
        }

        if (e.target.type === "number") {
            setTodo({...todo, [e.target.name]: +e.target.value});
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(todo);
    }
    
    return <form onSubmit={handleSubmit}>
        <input type="text" value={todo.titel} onChange={handelChange} name="titel"/>
        <input type="number" value={todo.date} onChange={handelChange} name="date"/>
        <button>save</button>
    </form>
}