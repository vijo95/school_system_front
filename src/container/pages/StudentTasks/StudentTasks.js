import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import { authAxios } from '../../../utils'
import { studentTaskDetail, updateStudentTask } from '../../../constants'

import StudentTaskDetail from '../../components/StudentTaskDetail/StudentTaskDetail'

import './StudentTasks.css'


export default class StudentTasks extends Component {

  state = {
    task_id: this.props.match.params.task_id,

    task: false,
    student_task_list: [],
    created_date: false,

    student_task_new_grade: [],

    error: false,

    updatingTasks: false
  }

  componentDidMount(){
    authAxios
      .post(studentTaskDetail, {
        id: this.state.task_id
      })
      .then(res => {
        this.setState({
          task: res.data.task,
          student_task_list: res.data.student_task_list,
          created_date: res.data.task.created_date.split('T')[0]
        })
      })
      .catch(err => {
        this.setState({error: true})
        console.log(err)
      })
  }

  findStudent = (array,id) => {
    for (let i = 0; i < array.length; i++) {
      if(array[i].student_task_id === id){
        return i
      }
    }
    return false
  }

  changeGrade = (id, new_grade) => {
    var ng = this.findStudent(this.state.student_task_new_grade,id)

   if (isNaN(parseInt(new_grade))){
     var new_grade = 0
   }
   
    if(ng === false){
      var new_student_grade_delivered = {
        student_task_id: parseInt(id),
        student_new_grade: parseInt(new_grade),
      }
      let student_new_grades = [...this.state.student_task_new_grade]
      student_new_grades.push(new_student_grade_delivered)
      this.setState({
        student_task_new_grade: student_new_grades
      })
    } else {
      let student_new_grades = [...this.state.student_task_new_grade]
      student_new_grades[ng].student_new_grade = parseInt(new_grade)
      this.setState({
        student_task_new_grade: student_new_grades
      })
    }
  }

  changeDelivered = (id, new_delivered) => {
    var nd = this.findStudent(this.state.student_task_new_grade,id)
    if(nd === false){
      var new_student_grade_delivered = {
        student_task_id: parseInt(id),
        student_new_delivered: new_delivered
      }
      let student_new_delivereds = [...this.state.student_task_new_grade]
      student_new_delivereds.push(new_student_grade_delivered)
      this.setState({
        student_task_new_grade: student_new_delivereds
      })
    } else {
      let student_new_delivereds = [...this.state.student_task_new_grade]
      student_new_delivereds[nd].student_new_delivered = new_delivered
      this.setState({
        student_task_new_grade: student_new_delivereds
      })
    }
  }

  handleSubmit = () => {
    this.setState({updatingTasks: true})
    if(this.state.student_task_new_grade !== undefined){
      authAxios
      .post(updateStudentTask,{
        task_id: this.state.task_id,
        student_task_grade_list: this.state.student_task_new_grade
      })
      .then(res => {
        this.setState({updatingTasks: false})
        authAxios
          .post(studentTaskDetail, {
            id: this.state.task_id
          })
          .then(res => {
            this.setState({
              task: res.data.task,
              student_task_list: res.data.student_task_list,
              created_date: res.data.task.created_date.split('T')[0]
            })
          })
          .catch(err => {
            this.setState({error: true})
            console.log(err)
          })
      })
      .catch(err => {
        this.setState({updatingTasks: false})
        console.log(err)
      })
    }
  }

  render() {
    const { task, student_task_list, created_date, error} = this.state

    return (
      <>
        { error ? <div><h1>No tienes los permisos para acceder a esta página</h1></div> :
          task && student_task_list.length === 0 && created_date ? <div className="loader"></div> :
          <div style={{marginBottom:'100px'}}>
            
            <div 
              className="card" 
              style={{
                width:'50%',
                margin:'auto',
                padding:'20px',
                marginBottom:'40px',
                backgroundColor:'rgba(0, 234, 255, 0.2)'
              }}
            >
              <h2 style={{textAlign:'center', margin:'20px 0px 20px 0px'}}>
                {task.title}<br/> {task.subject_name} de {
                task.subject_year}° {task.subject_year_division}
              </h2>
              <h3 style={{textAlign:'center'}}>
                Impartido: {created_date}<br/>
                Entrega: {task.due}
              </h3>
              <p>{task.text}</p>
            </div>
            
            <table style={{boxShadow:'0px 0px 10px 5px rgba(0,0,0,0.5)'}}>
              <tr style={{backgroundColor:'#CFD8DC'}}>
                <th><i>Apellido</i></th>
                <th><i>Nombre</i></th>
                <th><i>Entregado</i></th>
                <th><i>Nota</i></th>
              </tr>
              { student_task_list.map((student_task,index) => 
                <StudentTaskDetail 
                  key={index}
                  name={student_task.student_name}
                  lastname={student_task.student_last}
                  delivered={student_task.delivered}
                  grade={student_task.grade}
                  student_task_id={student_task.id}
                  changeGrade={this.changeGrade}
                  changeDelivered={this.changeDelivered}
                />
              )}
            </table>
            
            <div 
              className="card" 
              style={{
                width:'20%',
                margin:'auto',
                marginTop:'20px',
              }}
            >
              <Button
              onClick={() => this.handleSubmit()}
              loading={this.state.updatingTasks}
              disabled={this.state.updatingTasks}
              color='blue'
              type='submit'
              style={{margin:'0px'}}>
                Cargar Notas
            </Button>
            </div>

          </div>
        }
      </>
    )
  }
}
