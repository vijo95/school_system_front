import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {TiPlus} from "react-icons/ti"
import { Button, Form, Select } from 'semantic-ui-react'

import { authAxios } from '../../../utils'
import { subjects } from '../../../constants'
import TestElement from '../TestElement/TestElement'

import './TestList.css'
import { sub } from 'date-fns';

export default class TestList extends Component {

  state = {
    test_list: [],
    subject_list_teacher: null,
    subject_list_student: null
  }

  componentDidMount() {
    this.setState({test_list: this.props.test_list})
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
      var tests = [...this.props.test_list]
      tests = tests.filter(test => test.subject_id === value)
      this.setState({
        test_list: tests
      })
    } else {
      var tests = [...this.props.test_list]
      this.setState({
        test_list: tests
      })
    }
  }

  render() {

    const {teacher} = this.props
    const {test_list, subject_list_teacher, subject_list_student} = this.state

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
      <div className="test-list">
        <h1>
          Exámenes 
          { teacher ?
            <Link to="/create-test/">
              <Button
                style={{
                  backgroundColor:'#FFC400', 
                  color:'white',
                  marginLeft:'15px'
                }}>
                Nuevo Exámen
                <TiPlus 
                  style={{
                    marginLeft:'5px',
                    fontSize:'18px'
                  }}
                />
              </Button>
            </Link> :
            null
          }
        </h1>
        <div className="test-list-scroll">
        <div 
            style={{
              width:'100%',
              marginBottom:'20px'
            }}
          >
            <Form.Select
              className="card"
              control={Select}
              fluid
              options={options}
              placeholder='Materia'
              onChange={this.handleFilter}
              style={{
                width:'100%'
              }}
            />
          </div>
          {
            test_list === undefined ? null :
            test_list.map((test,index) => 
              <TestElement 
                key={index} 
                test={test}
                test_id={test.id}
                teacher={teacher} /> 
            )
          }
        </div>
      </div>
    )
  }
}