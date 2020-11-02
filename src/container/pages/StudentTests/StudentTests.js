import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import { authAxios } from '../../../utils'
import { studentTestDetail, updateStudentTest } from '../../../constants'

import StudentTestDetail from '../../components/StudentTestDetail/StudentTestDetail'

import './StudentTests.css'

export default class StudentTests extends Component {

  state = {
    test_id: this.props.match.params.test_id,

    test: false,
    student_test_list: [],

    student_test_new_grade: [],

    error: false,

    updatingTests: false
  }

  componentDidMount() {
    authAxios
      .post(studentTestDetail, {
        id: this.state.test_id
      })
      .then(res => {
        this.setState({
          test: res.data.test,
          student_test_list: res.data.student_test_list
        })
      })
      .catch(err => {
        this.setState({
          error: true
        })
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
    var ng = this.findStudent(this.state.student_test_new_grade,id)

   if (isNaN(parseInt(new_grade))){
     var new_grade = 0
   }

    if(ng === false){
      var new_student_grade_delivered = {
        student_test_id: parseInt(id),
        student_new_grade: parseInt(new_grade),
      }
      let student_new_grades = [...this.state.student_test_new_grade]
      student_new_grades.push(new_student_grade_delivered)
      this.setState({
        student_test_new_grade: student_new_grades
      })
    } else {
      let student_new_grades = [...this.state.student_test_new_grade]
      student_new_grades[ng].student_new_grade = parseInt(new_grade)
      this.setState({
        student_test_new_grade: student_new_grades
      })
    }
  }

  handleSubmit = () => {
    this.setState({updatingTests: true})
    if(this.state.student_test_new_grade !== undefined){
      authAxios
      .post(updateStudentTest,{
        test_id: this.state.test_id,
        student_test_grade_list: this.state.student_test_new_grade
      })
      .then(res => {
        this.setState({updatingTests: false})
        authAxios
          .post(studentTestDetail, {
            id: this.state.test_id
          })
          .then(res => {
            this.setState({
              test: res.data.test,
              student_test_list: res.data.student_test_list
            })
          })
          .catch(err => {
            this.setState({
              error: true
            })
            console.log(err)
          })
      })
      .catch(err => {
        this.setState({updatingTests: false})
      })
    }
  }

  render() {
    const { test, student_test_list, error} = this.state
    return (
      <>
        { error ? <div><h1>No tienes los permisos para acceder a esta página</h1></div> :
          test && student_test_list.length === 0 ? <div className="loader"></div> :
          <div style={{marginBottom:'100px'}}>

            <div
              className="card"
              style={{
                width:'50%',
                margin:'auto',
                padding:'20px',
                marginBottom:'40px',
                backgroundColor:'rgba(255, 196, 0, 0.2)'
              }}
            >
              <h2 style={{textAlign:'center', margin:'20px 0px 20px 0px'}}>
                {test.title}<br/> {test.subject_name} de {
                test.subject_year}° {test.subject_year_division}
              </h2>
              <h3 style={{textAlign:'center'}}>
                Fecha: {test.date}
              </h3>
            </div>

            <table style={{boxShadow:'0px 0px 10px 5px rgba(0,0,0,0.5)'}}>
              <tr style={{backgroundColor:'#CFD8DC'}}>
                <th><i>Apellido</i></th>
                <th><i>Nombre</i></th>
                <th><i>Nota</i></th>
              </tr>
              { student_test_list.map((student_test,index) =>
                <StudentTestDetail
                  key={index}
                  name={student_test.student_name}
                  lastname={student_test.student_last}
                  grade={student_test.grade}
                  student_test_id={student_test.id}
                  changeGrade={this.changeGrade}
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
              loading={this.state.updatingTests}
              disabled={this.state.updatingTests}
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
