/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Todo.css";
import toast from "react-hot-toast";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  let data = JSON.parse(localStorage.getItem("user"));
  const activePerson = data?.find((x) => x.isactive);
  const [completionDate, setCompletionDate] = useState(new Date());

  useEffect(() => {
    if (activePerson.task) setTodos(activePerson.task);
  }, []);

  const addTask = () => {
    if (newTask !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          taskname: newTask,
          completed: false,
          toBeDoneBy: `${completionDate.getDate()}/ ${
            completionDate.getMonth() + 1
          } /${completionDate.getFullYear()}`,
        },
      ]);

      let task = activePerson.task || [];
      task.push({
        id: Date.now(),
        taskname: newTask,
        completed: false,
        toBeDoneBy: `${completionDate.getDate()} ${
          completionDate.getMonth() + 1
        } ${completionDate.getFullYear()}`,
      });

      const updatedData = data.map((obj) => {
        if (obj.username === activePerson.username)
          return { ...obj, isactive: true, task };
        return obj;
      });
      toast.success("task added succesfully");

      data = updatedData;
      // console.log({ data });
      localStorage.setItem("user", JSON.stringify(data));
      setNewTask("");
    } else {
      toast.error("task cannot be empty");
    }
  };

  const editTask = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const completeTask = (id) => {

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    let data = JSON.parse(localStorage.getItem("user"));
    const activePerson = data?.find((x) => x.isactive);

    let task = activePerson.task.map((task) => {


      if (task.id === id) {
        if(!task.completed)        
        return { ...task, completed: true };
        else
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    let updatedData = data.map((obj) => {
      if (obj.username === activePerson.username) return { ...obj, task };
      return obj;
    });
    data = updatedData;
    // console.log({ data });
    localStorage.setItem("user", JSON.stringify(data));
  };

  const deleteTask = (id) => {
    const allowDelete = confirm("Are you sure to delete?");
    // console.log({ allowDelete });
    if (!allowDelete) return toast.success("Not Deleted");
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    let data = JSON.parse(localStorage.getItem("user"));
    const activePerson = data?.find((x) => x.isactive);

    let task = activePerson.task.filter((task) => {
      if (task.id === id) return false;
      return true;
    });
    let updatedData = data.map((obj) => {
      if (obj.username === activePerson.username) return { ...obj, task };
      return obj;
    });
    data = updatedData;
    // console.log({ data });
    toast.success("Successfully Deleted");
    localStorage.setItem("user", JSON.stringify(data));
  };
  const [sort, setSort] = useState("none");

  const sortByCompletion = () => {
    const sortedTodos = [...todos].sort((a, b) =>
      sort === "asc" ?a.completed-b.completed:b.completed-a.completed
    );
    setTodos(sortedTodos);
    setSort(sort==="asc"?"desc":"asc");
  };

  return (
    <div className="todo-app">
      <div>

      <h1>Todo App - Competishun</h1>
      <div className="todo-form">
        <label style={{ marginInline: ".2rem" }}>
          Task Name
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            style={{ marginInline: "1rem" }}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </label>

        <label style={{ marginInline: ".2rem" }}>
          Submission Date
          <input
            type="date"
            style={{ marginInline: "1rem" }}
            onChange={(e) => {
              setCompletionDate(new Date(`${e.target.value}`));
            }}
          />
        </label>
        <button
          onClick={addTask}
          style={{
            display: "flex",
            margin: ".5rem auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Add Task
          <AddBoxIcon style={{ marginLeft: ".5rem", fontSize: "16px" }} />
        </button>
      </div>

      <div className="filter-options">
        {["all", "active", "completed"].map((option) => (
          <label key={option}>
            <input
              type="radio"
              value={option}
              onChange={() => setFilter(option)}
              checked={filter === option}
            />
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </label>
        ))}
      </div>

      <div className="sort-options">
        <button onClick={sortByCompletion}>
          Sort by Completion {sort === "asc" ? "▼" : "▲"}
        </button>
      </div>

      <ul className="todo-list">
        {todos.length ? (
          <table>
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
                  if (filter === "all") return true;
                  if (filter === "active") return !todo.completed;
                  if (filter === "completed") return todo.completed;
                  return true;
                })
                .map((todo) => {
                  return (
                    <tr
                      key={todo.id}
                      className={todo.completed ? "completed" : ""}
                    >
                      <td className="line-through">{todo.text || todo.taskname}</td>
                      <td className="line-through"> {todo.toBeDoneBy}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => completeTask(todo.id)}
                        />
                      </td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            margin: ".5rem auto",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <button
                            onClick={() =>
                              editTask(todo.id, prompt("Edit task:", todo.text))
                            }
                            style={{
                              display: "flex",
                              margin: "0rem .3rem",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <span>Edit</span>
                            <EditIcon
                              style={{ marginLeft: ".5rem", fontSize: "16px" }}
                            />
                          </button>
                          <button
                            onClick={() => deleteTask(todo.id)}
                            style={{
                              display: "flex",
                              margin: "0rem .3rem",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <span>Delete</span>
                            <DeleteIcon
                              style={{ marginLeft: ".5rem", fontSize: "16px" }}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <li style={{ textAlign: "center", width: "100%", margin: "auto" }}>
            No Task You have
          </li>
        )}
      </ul>
      </div>

    </div>
  );
};

export default Todo;
