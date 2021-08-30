import React from "react";
import PropTypes from "prop-types";
import "./todoList.css";
import Task from '../Task/task';


function TaskList({filteredTodos, onToggleCompleted,deleteItem,changeTaskList}) {

  const taskRender = filteredTodos.map((item, index) => {
    const { id, ...itemProps } = item;
    return (
      <Task
        {...itemProps}
        key = {id}
        id={id}
        idx = {index}
        deleteItem={deleteItem}
        onToggleCompleted={onToggleCompleted}
        changeTaskList = {changeTaskList}
      />
    );
  });
  return <ul className="todo-list">{taskRender}</ul>;
  }

  TaskList.propTypes = {
    onToggleCompleted: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    changeTaskList: PropTypes.func.isRequired,
    filteredTodos: PropTypes.oneOfType([PropTypes.array]).isRequired
  };

  export default TaskList;