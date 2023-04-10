import './App.css';
import { Account } from './Components/Account';
import { TodoList } from './Components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Account></Account> */}
        <TodoList></TodoList>
      </header>
    </div>
  );
}

export default App;
