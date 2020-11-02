import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {TiPlus} from "react-icons/ti"
import { Button, Form, Select } from 'semantic-ui-react'

import { authAxios } from '../../../utils'
import { subjects } from '../../../constants'
import TaskElement from '../TaskElement/TaskElement'

import './TaskList.css'

export default class TaskList extends Component {

  state = {
    task_list: [],
    subject_list_teacher: null,
    subject_list_student: null
  }

  componentDidMount() {
    this.setState({task_list: this.props.task_list})
    authAxios
      .get(subjects)
      .then(res => {
        this.setState({
          subject_list_teacher: res.data.subject_list_teacher,
          subject_list_student: res.data.subject_list_student
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleFilter = (event,{value}) => {
    event.preventDefault()
    if(value !== 0){
      var tasks = [...this.props.task_list]
      tasks = tasks.filter(task => task.subject_id === value)
      this.setState({
        task_list: tasks
      })
    } else {
      var tasks = [...this.props.task_list]
      this.setState({
        task_list: tasks
      })
    }
  }

  render() {

    const {teacher} = this.props
    const {task_list, subject_list_teacher, subject_list_student} = this.state

    var options =  []
    // for teacher
    if(subject_list_teacher !== null && subject_list_teacher !== undefined){
      subject_list_teacher.map((subject,index) =>{
        options.push({
          key: {index},
          text: subject.name + " " + subject.year_year + "° " + subject.year_division,
          value: subject.id
        })
      })
      var l = options.length
      options.push({
        key: {l},
        text: "Todo",
        value: 0
      })
    }

    // for student
    if(subject_list_student !== null && subject_list_student !== undefined){
      subject_list_student.map((subject,index) =>{
        options.push({
          key: {index},
          text: subject.subject_name + " " + subject.subject_year + "° " + subject.subject_year_division,
          value: subject.subject_id
        })
      })
      var l = options.length
      options.push({
        key: {l},
        text: "Todo",
        value: 0
      })
    }

    return (
      <div className="task-list">
        <h1>
          Trabajos 
          { teacher ?
              <Link to="/create-task/">
                <Button 
                  color='blue'
                  style={{marginLeft:'15px'}}>
                  Nuevo Trabajo
                  <TiPlus 
                    style={{
                      marginLeft:'5px',
                      fontSize:'18px'
                    }}
                  />
                </Button>
              </Link> : null
          }
        </h1>
        <div className="task-list-scroll">
          <div 
            style={{
              marginBottom:'20px',
            }}
          >
            <Form.Select
              className="card"
              control={Select}
              fluid
              options={options}
              placeholder='Materia'
              onChange={this.handleFilter}
            />
          </div>
          { task_list === undefined ? null :
            task_list.map((task,index) =>
              <TaskElement 
                key={index} 
                task_index={index} 
                task_id={task.id}
                teacher={teacher}
                task={task}
              />
            )
          }
        </div>
      </div>
    )
  }
}
