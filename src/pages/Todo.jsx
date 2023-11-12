/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Todo.css';
import toast from 'react-hot-toast';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  let data=JSON.parse(localStorage.getItem("user"))
//   console.log(data)
  const activePerson=data?.find(x=>x.isactive)
  const [completionDate, setCompletionDate] = useState(new Date());

  useEffect(()=>{
    // console.log({activePerson})
    if(activePerson.task)
    setTodos(activePerson.task)
    // console.log({tasks:activePerson.task}) 
  },[])



  const addTask = () => {

    if (newTask !== '') {
      setTodos([...todos, { id: Date.now(), taskname: newTask, completed: false,toBeDoneBy:`${completionDate.getDate()}/ ${completionDate.getMonth()+1} /${completionDate.getFullYear()}`}]);
      
      let task=activePerson.task||[]
      task.push({ id: Date.now(), taskname: newTask, completed: false,toBeDoneBy:`${completionDate.getDate()} ${completionDate.getMonth()+1} ${completionDate.getFullYear()}`})
      
      const updatedData = data.map((obj) => {
          if (obj.username === activePerson.username) return { ...obj, isactive: true ,task};
          return obj;
      });
      toast.success("task added succesfully")

      data=updatedData
      console.log({data})
      localStorage.setItem("user",JSON.stringify(data))
      setNewTask('');
    }

    else{
        toast.error("task cannot be empty")
    }
  };

  const editTask = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const completeTask = (id) => {
    
      setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
      );

    let data=JSON.parse(localStorage.getItem("user"))
    const activePerson=data?.find(x=>x.isactive)

    let task=activePerson.task.map(task=>{
        if(task.id===id)
        return {...task,completed:true}
        return task;
      })
      let updatedData=data.map(obj=>{
          if(obj.username===activePerson.username)
          return{...obj,task}
      return obj
      })
      data=updatedData;
      console.log({data})
      localStorage.setItem("user",JSON.stringify(data))
  };

  const deleteTask = (id) => {

    const allowDelete=confirm("Are you sure to delete?");
    console.log({allowDelete})
    if(!allowDelete)
    return toast.success("Not Deleted")
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    let data=JSON.parse(localStorage.getItem("user"))
    const activePerson=data?.find(x=>x.isactive)
    
    let task=activePerson.task.filter(task=>{
        if(task.id===id)
        return false
        return true;
      })
      let updatedData=data.map(obj=>{
          if(obj.username===activePerson.username)
          return{...obj,task}
      return obj
      })
      data=updatedData;
      console.log({data})
      toast.success("Successfully Deleted")
      localStorage.setItem("user",JSON.stringify(data))
  };

  return (
    <div className="todo-app">

      <h1>Todo App</h1>
      <div className="todo-form">
        <label style={{marginInline:".2rem"}}>
        Task Name
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          style={{marginInline:".2rem"}}
          onChange={(e) => setNewTask(e.target.value)}
        />
        </label>

        <label style={{marginInline:".2rem"}}>
        Submission Date
        <input type='date' 
        style={{marginInline:".2rem"}}
          onChange={(e) =>{
            //  console.log(e.target.value)
            setCompletionDate(new Date(`${e.target.value}`))
          }}/>
        </label>
        <button onClick={addTask} style={{display:"block",margin:".5rem auto"}}>Add Task</button>
      </div>


      <div className="filter-options">
      <label>
        <input
          type="radio"
          value="all"
          onChange={() => setFilter('all')}
          checked={filter === 'all'}
        />
        All
      </label>
      <label>
        <input
          type="radio"
          value="active"
          onChange={() => setFilter('active')}
          checked={filter === 'active'}
        />
        Active
      </label>
      <label>
        <input
          type="radio"
          value="completed"
          onChange={() => setFilter('completed')}
          checked={filter === 'completed'}
        />
        Completed
      </label>
    
      </div>

      <ul className="todo-list">

        {todos.length? <table>
            <thead>
                <tr>
                    <th>TaskName</th>
                    <th>Date</th>
                    <th>Completed</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>

        {todos
    .filter((todo) => {
      if (filter === 'all') return true;
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    }).map((todo) => {
            // console.log(todo)
            return (
                <tr key={todo.id} className={todo.completed ? 'completed' : ''}>
            <td >{todo.text||todo.taskname}</td>
            <td >{todo.toBeDoneBy}</td>
            <td><input type="checkbox" checked={todo.completed} onClick={()=>completeTask(todo.id)}/></td>
            <td style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div>

              <button onClick={() => editTask(todo.id, prompt('Edit task:', todo.text))}>
                Edit
              </button>
              <button onClick={() => deleteTask(todo.id)}>Delete</button>
                </div>
            </td>
          </tr>
        )})}

        </tbody>

        </table>
        :
        <li style={{textAlign:"center",width:"100%",margin:"auto"}}>No Task You have </li>
        }


      </ul>
    </div>
  );
};

export default Todo;
