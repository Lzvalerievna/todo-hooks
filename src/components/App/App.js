import React, {useState} from "react";
import "./App.css";
import NewTaskForm from "../NewTaskForm/newTaskForm";
import Footer from "../Footer/footer";
import TaskList from "../TodoList/todoList";
 
export default function App() {


  const [taskList, setTaskList] = useState([  
    {label: "Editing task",min: 0, sec: 5, time: Date.now(),completed: false, id: 1},
    {label: "Completed task",min: 15, sec: 5,time: Date.now(),completed: false, id: 2},
    {label: "Active task",min: 30, sec: 15, time: Date.now(),completed: false, id: 3},
  ]);

  const [filter, setFilter] = useState('all')

  const onFilterChange = (filter) => {
    setFilter(filter);
  };


  const addItem = (text, min, sec) =>  {
    if (text.trim() &&  ( sec > 0 && sec < 60) && min >= 0 ) {
      setTaskList([...taskList, {label: text, min, sec, time: Date.now(), completed: false, id: Math.random() * 1125}])
    } 
  }

  const filtered = (taskList, filter) => {
    switch (filter) {
      case "all":
        return taskList;
      case "active":
        return taskList.filter((item) => !item.completed);
      case "completed":
        return taskList.filter((item) => item.completed);
      default:
        return taskList;
    }
  }


  const onToggleCompleted = (id) => {
      const idx = taskList.findIndex((el) => el.id === id);
      const oldItem = taskList[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed }
      const newArray = [...taskList.slice(0, idx),newItem,...taskList.slice(idx + 1),];
      setTaskList(newArray)
  };

  const deleteItem = (id) => {
    const idx = taskList.findIndex((el) => el.id === id);
    const newArray = [...taskList.slice(0, idx), ...taskList.slice(idx + 1)];
    setTaskList(newArray)
  }; 

  const changeTaskList = (editText, idx) => {
    const newTaskList = [...taskList]
    newTaskList.forEach((task, index) => {
      if ( index === idx) {
        task.label = editText
      }
    })
    setTaskList(newTaskList)
  }
  
  const activeCount = taskList.filter((el) => !el.completed).length;


  const deleteCompleted = () => {
      const newTaskList = taskList.filter((el) => !el.completed);
      const newDatList = [...newTaskList];
      setTaskList(newDatList)
  };

  const filteredTodos = filtered(taskList, filter);

  return (
      <section className="todoapp">
        <h1>todos</h1>
        <NewTaskForm addItem = {addItem}/>
        <TaskList filteredTodos = {filteredTodos} deleteItem = {deleteItem} changeTaskList = {changeTaskList} onToggleCompleted = {onToggleCompleted}/>
        <Footer onFilterChange = {onFilterChange} filter = {filter} activeCount = {activeCount} deleteCompleted = {deleteCompleted}/>
      </section>
  );
}