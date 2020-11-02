import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

import { authAxios } from '../../../utils'
import { subjects, createTest } from '../../../constants'

import { Button, Form, Segment, Select, Message } from 'semantic-ui-react'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/es';

import './CreateTest.css'

export default class CreateTest extends Component {

  state = {
    loading: true,
    teacher: false,
    subject_list_teacher: null,

    title: null,
    subject: null,

    date_day:null,
    date_month: null,
    date_year: null,

    day: null,
    creatingTest: false,
  }

  componentDidMount() {
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
      title,
      subject, 
      date_day, 
      date_month,
      date_year,
    } = this.state

    if(this.isNullEmptyOrSpace(title) ||
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
    
    this.setState({creatingTest: true})
    authAxios
      .post(createTest,{
        title: title,
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

          creatingTest: false,
        })
      })
      .catch(err => {
        var messageError = document.getElementById("error-message")
        var messageSuccess = document.getElementById("success-message")
        messageError.classList.remove("hideMessage")
        messageSuccess.classList.add("hideMessage")
        this.setState({
          creatingTest: false,
        })
        console.log(err)
      })
  }

  /* Handle Change in Inputs */
  handleTitleChange = (event, {value}) => {
    event.preventDefault()
    this.setState({title: value})
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

    const { subject_list_teacher, creatingTest } = this.state

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
      <div className="card-create-test" >
        <Message
          className="hideMessage"
          negative 
          id="error-message"
          style={{width:'75%',margin:'auto'}}
        >
          <Message.Header>
            Verifica que hayas completado todos los campos correctamente
            y no seas usuario de prueba
            </Message.Header>
        </Message>
        <Message
          className="hideMessage"
          positive 
          id="success-message"
          style={{width:'75%',margin:'auto'}}
        >
          <Message.Header>Nuevo exámen creado correctamente</Message.Header>
        </Message>
        <h1 
          style={{
            margin:'auto',
            textAlign:'center',
            margin:'20px 0px 20px 0px'
          }}>
            Nuevo Exámen
        </h1>
        
        <Segment 
          inverted
          className="create-test-form" 
          style={{
            margin:'auto',
            textAlign:'center',
            borderRadius:'20px',
            padding:'30px'
          }}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              value={this.state.title} 
              fluid
              placeholder='Título del Exámen'
              onChange={this.handleTitleChange}
            />
            <Form.Group widths='equal'>
              <Form.Input>
                <DayPickerInput
                  value={this.state.day}
                  onDayChange={this.handleDayChange}
                  formatDate={formatDate}
                  format="LL"
                  parseDate={parseDate}
                  placeholder={`Fecha del Exámen`}
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
              color='teal'
              type='submit'
              loading={creatingTest}
              disabled={creatingTest}
              style={{width:'33%'}}>
                Crear Exámen
            </Button>
          </Form>
        </Segment>
      </div>
    )
  }
}
