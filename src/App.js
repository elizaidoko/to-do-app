
import Styles from './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';


function App() {
  
  
  return (
   
    <div className="todo-app">
      <TodoList/>
    </div>
    
  );
}

export default App;
