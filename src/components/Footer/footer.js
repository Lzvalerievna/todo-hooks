import "./footer.css";
import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "../TasksFilter/tasksFilter";

function Footer({filter, onFilterChange, activeCount, deleteCompleted}) {


  return (
    <footer className="footer">
      <span className="todo-count">{activeCount} items left</span>
      <TasksFilter onFilterChange = {onFilterChange} filter = {filter}/>
      <button type="button" className="clear-completed" onClick = {deleteCompleted}>
        {" "}
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    activeCount: PropTypes.number.isRequired,
    deleteCompleted: PropTypes.func.isRequired
  };

export default Footer;