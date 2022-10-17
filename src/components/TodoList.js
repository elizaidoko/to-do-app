import React, {useState, useEffect} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import axios from 'axios'
import { Card, Container } from 'react-bootstrap'


function TodoList() {
  
    const [todos, setTodos] = useState([])
    useEffect(() => {
      axios.get("http://localhost:5984/to-do-list/_design/allTodos/_view/todos", {
         auth: {
           username: 'admin',
           password: 'admin'
         }
       }).then((result)=>{
         setTodos(result.data.rows)
        
       });
 }, []);



    const addTodo = todo => {
        if (!todo.key || /^\s*$/.test(todo.key)){
            return
        }

        axios.put("http://localhost:5984/to-do-list/" + todo.id, {todo: todo.key},{
        auth: {
          username: 'admin',
          password: 'admin'
        }
      }).then((result)=>{
        console.log(result.data);
      });


        const newTodos = [todo, ...todos];

        setTodos(newTodos)
        //console.log(todo,...todos)
    }



    const removeTodo = id => {
      
      axios.get("http://localhost:5984/to-do-list/" + id, {
        auth: {
          username: 'admin',
          password: 'admin'
        }
      }).then((result)=>{
        let data = result.data
        let rev = data._rev;
    
 
   axios.delete("http://localhost:5984/to-do-list/" + id + "/?rev="+ rev,{
        auth: {
          username: 'admin',
          password: 'admin'
        }
      }).then((result)=>{
        console.log(result.data);
    });

        
})

        const removeArray= [...todos].filter(todo => todo.id !== id)
        setTodos(removeArray)
    }

    const updateTodo = (todoId, newValue) => {
      if (!newValue.key || /^\s*$/.test(newValue.key)){
        return
    }
    axios.get("http://localhost:5984/to-do-list/" + todoId, {
        auth: {
          username: 'admin',
          password: 'admin'
        }
      }).then((result)=>{
        let data = result.data
        let rev = data._rev;

        axios.put("http://localhost:5984/to-do-list/" + todoId ,{ _rev : rev , todo : newValue.key}, {
          auth: {
            username: 'admin',
            password: 'admin'
          }
        }).then((result)=>{
            console.log(result.data);
          });

        
      })

      setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }

  return (
   
      <div className="py-5 mx-auto" style={{ display: 'block', 
      width: 600, 
      padding: 30 }}>
        <h1>Whats the plan for today?</h1>
        <br></br>
        <TodoForm onSubmit={addTodo}/>
        <Todo 
        todos={todos}
        removeTodo={removeTodo}
        updateTodo={updateTodo}/>
    </div>
    
    
  )
}

export default TodoList