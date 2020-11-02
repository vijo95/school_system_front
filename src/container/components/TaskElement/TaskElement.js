import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './TaskElement.css'

export default class TaskElement extends Component {
  
  showMore = (task_id) => {
    var small_text = document.getElementById(task_id+"+")
    var big_text = document.getElementById(task_id+"-")

    small_text.classList.add("hideText")
    big_text.classList.remove("hideText")
  }

  showLess = (task_id) => {
    var small_text = document.getElementById(task_id+"+")
    var big_text = document.getElementById(task_id+"-")

    small_text.classList.remove("hideText")
    big_text.classList.add("hideText")
  }
  
  
  render() {
    
    const {
      created_date,
      due,
      subject_name,
      subject_year,
      subject_year_division,
      text,
      title,

      teacher,
      grade,
    } = this.props.task
    const task_id  = this.props.task_id
    const task_index = this.props.task_index

    return (
      <>
      { 6 <= grade ?
          <div className="card task-element task-passed">
            <h3>{subject_name + " de " + subject_year + "° " + subject_year_division}</h3>
            <h4>{title}</h4>
            
            <p id={task_index+"+"}>
              {text.substr(0,140)}
              <a style={{color:'blue',}}
                onClick={() => this.showMore(task_index)}>
                  ...más
              </a>
            </p>
            <p id={task_index+"-"} className="hideText">
              {text}
              <a style={{color:'blue'}} 
                onClick={() => this.showLess(task_index)}>
                  ...menos
              </a>
            </p>
            
            <h5>Impartido: {created_date.split('T')[0]}</h5>
            <h5>Entrega: {due}</h5>
            <br/>
            <h5 style={{color:'white'}}>Nota: {grade}</h5>
          </div> : 
        grade < 6 && grade !== null ?
          <div className="card task-element task-failed">
            <h3>{subject_name + " de " + subject_year + "° " + subject_year_division}</h3>
            <h4>{title}</h4>

            <p id={task_index+"+"}>
              {text.substr(0,140)}
              <a style={{color:'blue'}}
                onClick={() => this.showMore(task_index)}>
                  ...más
              </a>
            </p>
            <p id={task_index+"-"} className="hideText">
              {text}
              <a style={{color:'blue'}} 
                onClick={() => this.showLess(task_index)}>
                  ...menos
              </a>
            </p>
            
            <h5>Impartido: {created_date.split('T')[0]}</h5>
            <h5>Entrega: {due}</h5>
            <br/>
            <h5 style={{color:'white'}}>Nota: {grade}</h5>
          </div> :
          teacher ?
          <div className="card task-element">
            <Link to={`/student-tasks/${task_id}`}>
              <h3>{subject_name + " de " + subject_year + "° " + subject_year_division}</h3>
              <h4>{title}</h4>
            
              <p id={task_index+"+"}>
                {text.substr(0,140)}
                <a style={{color:'blue'}}
                  onClick={() => this.showMore(task_index)}>
                    ...más
                </a>
              </p>
              <p id={task_index+"-"} className="hideText">
                {text}
                <a style={{color:'blue'}} 
                  onClick={() => this.showLess(task_index)}>
                    ...menos
                </a>
              </p>
              
              <h5>Impartido: {created_date.split('T')[0]}</h5>
              <h5>Entrega: {due}</h5>
            </Link>
          </div> :
          <div className="card task-element">
            <h3>{subject_name + " de " + subject_year + "° " + subject_year_division}</h3>
            <h4>{title}</h4>
          
            <p id={task_index+"+"}>
              {text.substr(0,140)}
              <a style={{color:'blue'}}
                onClick={() => this.showMore(task_index)}>
                  ...más
              </a>
            </p>
            <p id={task_index+"-"} className="hideText">
              {text}
              <a style={{color:'blue'}} 
                onClick={() => this.showLess(task_index)}>
                  ...menos
              </a>
            </p>
            
            <h5>Impartido: {created_date.split('T')[0]}</h5>
            <h5>Entrega: {due}</h5>
        </div>
      }
      </>
    )
  }
}
