import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import "./task.css";
import { formatDistance } from 'date-fns';

function Task({ idx, id, completed, label,min, sec, time, deleteItem,onToggleCompleted,changeTaskList}) { 
  const [onEdit, setOnEdit] = useState(false)
  const [editText,setEditText] = useState(label)
  const [play, setPlay] = useState(false)
  const [timer, setTimer] =useState({min, sec})
  const [finished, setFinished] = useState('')

  const onStart = () => setPlay(true)
  const onStop = () => setPlay(false)
  
  useEffect(() => {
    if(!completed) {  
      let interval = null
        if(play) {
          interval = setInterval(() => {
            if (timer.min >= 0 && (timer.sec <= 59 && timer.sec !== 0)) {
              setTimer({min: timer.min, sec: timer.sec -1})
             
            }
            if(timer.sec === 1 && timer.min >= 1) {
              setTimer({min: timer.min - 1, sec:  59 })
            }
            if(timer.sec === 0 && timer.min === 0) {
              setFinished('finished')
            }
          },1000)
        }
       return () => {
         clearInterval(interval)
      }
    }
  })

  


  const createTime = formatDistance(time, Date.now());

  const changeOnEdit = () => setOnEdit(true)

  const changeSave = () => {
    setOnEdit(false)
    if (editText) {
      changeTaskList(editText,idx)
    }
    setEditText(label)
  }

  const changeText = (ev) => setEditText(ev.target.value)
  
  if(onEdit) {
    return (
      <li>
       <div className="view">
          <label className = "labelEdit">
            <input className = "inputText" type="text" id = "editText" value = {editText} name = "editText"
              onChange = {(ev) => changeText(ev)}
            />
          </label>
            <button aria-label="text" className="icon icon-edit-save" type="button" key = {id} onClick = {() => changeSave()} />
        </div>
      </li>
    )

  } else {  
    return (
      <li className="completed">
       <div className="view">
          <input className="toggle" type="checkbox" onChange = {() => onToggleCompleted(id)} checked = {completed}/>
          <label>
            <span className={completed ? "description" : "taskCompleted"} id = {id }>{label}</span>
            <div className = "timer"> 
                <button  onClick = {onStart} className="icon-play" aria-label="Play" type="button"/>
                <button onClick = {onStop} className="icon-pause" aria-label="Pause" type="button"/>
                {timer.min > 0 || timer.sec > 0 ? 
                <p className="timer__time" id = {id}>{timer.min < 10 ? "0" + timer.min: timer.min}:{timer.sec < 10 ? "0" +timer.sec: timer.sec}</p> : 
                <p className="finished" id = {id}>{finished}</p>}
             </div>
             <span className="created">created {createTime} ago</span>
          </label>
            <button type="button" aria-label="text" className="icon icon-edit" disabled = {completed} onClick = {changeOnEdit}/>
            <button type="button" aria-label="text" className="icon icon-destroy" onClick={() => deleteItem(id)}/>
        </div>
      </li>
    );

  }

}

Task.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  changeTaskList: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  idx: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  sec: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired
};

export default Task;