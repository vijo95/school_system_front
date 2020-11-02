import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

import { authAxios } from '../../../utils'
import { subjects, createTask } from '../../../constants'

import { Button, Form, Segment, Select, Message } from 'semantic-ui-react'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/es';

import './CreateTask.css'

export default class CreateTask extends Component {

  state = {
    loading: true,
    teacher: false,
    subject_list_teacher: null,

    title: null,
    text: null,
    subject: null,

    date_day:null,
    date_month: null,
    date_year: null,

    day: null,

    creatingTask: false,
  }

  componentDidMount(){
    this.setState({loading:true})
    authAxios
      .get(subjects)
      .then(res => {
        this.setState({
          loading: false,
          teacher: res.data.teacher,
          subject_list_teacher: res.data.subject_list_teacher,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  isNullEmptyOrSpace = (string) => {
    return string === null || string === '' || string.trim().length === 0 || string === undefined
  }

  /* Handle Form Submit */
  handleSubmit = event => {
    event.preventDefault()
    const {
      title, text,
      subject, date_day,
      date_month, date_year
    } = this.state

    if(this.isNullEmptyOrSpace(title) ||
      this.isNullEmptyOrSpace(text) ||
      this.isNullEmptyOrSpace(subject) ||
      this.isNullEmptyOrSpace(date_day) ||
      this.isNullEmptyOrSpace(date_month) ||
      this.isNullEmptyOrSpace(date_year)){
        var messageError = document.getElementById("error-message")
        var messageSuccess = document.getElementById("success-message")
        messageError.classList.remove("hideMessage")
        messageSuccess.classList.add("hideMessage")
        return
      }
    
    this.setState({creatingTask: true})
    authAxios
      .post(createTask,{
        title: title,
        text: text,
        subject: subject,
        date_day: date_day,
        date_month: date_month,
        date_year: date_year
      })
      .then(res => {
        console.log(res.data);
        var messageError = document.getElementById("error-message")
        var messageSuccess = document.getElementById("success-message")
        messageError.classList.add("hideMessage")
        messageSuccess.classList.remove("hideMessage")
        this.setState({
          title: "",
          text: "",
          subject: null,
          day: null,
          creatingTask: false
        })
      })
      .catch(err => {
        var messageError = document.getElementById("error-message")
        var messageSuccess = document.getElementById("success-message")
        messageError.classList.remove("hideMessage")
        messageSuccess.classList.add("hideMessage")
        console.log(err)
        this.setState({creatingTask: false})
      })
  }

  /* Handle Change in Inputs */
  handleTitleChange = (event, {value}) => {
    event.preventDefault()
    this.setState({title: value})
  }
  handleTextChange = (event, {value}) => {
    event.preventDefault()
    this.setState({text: value})
  }
  handleSubjectChange = (event, {value}) => {
    event.preventDefault()
    this.setState({subject: value})
  }
  handleDayChange = (day) => {
    if(day !== undefined){
      this.setState({ 
        day: day,
        date_day: day.toLocaleDateString().split('/')[1],
        date_month: day.toLocaleDateString().split('/')[0],
        date_year: day.toLocaleDateString().split('/')[2],
      });
    }
  }

  render() {

    if(!this.state.teacher && !this.state.loading){
      return <Redirect to="/" />
    }

    const { subject_list_teacher, creatingTask } = this.state

    var options = []
    if(subject_list_teacher !== null){
      subject_list_teacher.map((subject,index) =>{
        options.push({
          key: {index},
          text: subject.name + " " + subject.year_year + "° " + subject.year_division,
          value: subject.name + "," + subject.year_year + "," + subject.year_division
        })
      })
    }

    return (
      <div className="card-create-task" >
        <Message
          className="hideMessage"
          negative 
          id="error-message"
          style={{width:'75%',margin:'auto'}}
        >
          <Message.Header>
            Verifica que hayas completado todos los campos correctamente 
            y que no seas usuario de prueba
            </Message.Header>
        </Message>
        <Message
          className="hideMessage"
          positive 
          id="success-message"
          style={{width:'75%',margin:'auto'}}
        >
          <Message.Header>Nuevo trabajo creado correctamente</Message.Header>
        </Message>
        <h1 
          style={{
            margin:'auto',
            textAlign:'center',
            margin:'20px 0px 20px 0px'
          }}>
            Nuevo Trabajo
        </h1>
        
        <Segment 
          inverted
          className="create-task-form" 
          style={{
            margin:'auto',
            textAlign:'center',
            borderRadius:'20px',
            padding:'30px',
            marginBottom: '100px'
          }}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              value={this.state.title} 
              fluid
              placeholder='Título del Trabajo'
              onChange={this.handleTitleChange}
            />
            <Form.TextArea
              value={this.state.text}
              fluid
              rows={7}
              placeholder='Información sobre el trabajo' 
              onChange={this.handleTextChange}
            />
            <Form.Group widths='equal'>
              <Form.Input style={{zIndex:'1031'}}>
                <DayPickerInput
                  value={this.state.day}
                  onDayChange={this.handleDayChange}
                  formatDate={formatDate}
                  format="LL"
                  parseDate={parseDate}
                  placeholder={`Fecha de Entrega`}
                  dayPickerProps={{
                    locale: 'es',
                    localeUtils: MomentLocaleUtils,
                    showWeekNumbers: true,
                  }}
                />
              </Form.Input>
              <Form.Select
                value={this.state.subject}
                control={Select}
                fluid
                options={options}
                placeholder='Materia'
                onChange={this.handleSubjectChange}
              />
            </Form.Group>
            <Button
              loading={creatingTask}
              disabled={creatingTask}
              color='teal'
              type='submit'
              style={{width:'33%'}}>
                Crear Trabajo
            </Button>
          </Form>
        </Segment>
      </div>
    )
  }
}