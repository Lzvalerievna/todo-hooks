import React, { useState } from "react";
import PropTypes from "prop-types";
import "./newTaskForm.css";

function NewTaskForm({addItem}) {

  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')


  const onSubmit = (event) => {
    event.preventDefault();
    addItem(label, +min, +sec);
    setLabel(''); 
    setMin('');
    setSec('')
  };

  const onLabelChange = (event) => {
    const {name, value} = event.target
    if(name === "label") {setLabel(value)}
    if(name === "min") { setMin(value)} 
    if(name === "sec") {setSec(value)}
  }

     return (
      <div> 
        <form onSubmit={onSubmit} className = "new-todo-form">
          <input type="text" className="new-todo" placeholder="Task" onChange={onLabelChange} value={label} name = "label"/>
          <input className="new-todo-form__timer" placeholder="Min" onChange={onLabelChange} value={min} name = "min"/>
          <input className="new-todo-form__timer" placeholder="Sec" onChange={onLabelChange} value={sec} name = "sec"/>
          <input type ="submit" className = "submit" />
        </form>
      </div>
    );

}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired
};

export default NewTaskForm;