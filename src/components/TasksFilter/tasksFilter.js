import React from "react";
import "./tasksFilter.css";
import PropTypes from "prop-types";


function TasksFilter({filter, onFilterChange}) {

const  buttons = [
  { name: "all", label: "All" },
  { name: "active", label: "Active" },
  { name: "completed", label: "Completed" },
];
const buttonsss = buttons.map(({ name, label }) => {
  const isActive = filter === name;
  const clazz = isActive ? "selected" : "";
  return (
    <li key={name}>
      <button
        type="button"
        className={`${clazz}`}
        onClick={() => onFilterChange(name)}
      >
        {label}
      </button>
    </li>
  );
});
return <ul className="filters">{buttonsss}</ul>;

}

TasksFilter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired
  };
export default TasksFilter;