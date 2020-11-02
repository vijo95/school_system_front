import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { authAxios } from '../../../utils'
import { studentOrTeacher, createProfile } from '../../../constants'
import { Button, Form, Segment, Select, Message } from 'semantic-ui-react'
import './CreateProfile.css'


export default class CreateProfile extends Component {

  state = {
    got_profile: false,

    year_list: [],
    teacher: false,
    student: false,

    name: '',
    lastname: '',
    dni: '',
    entry_year:'',
    current_year: '',

    creatingProfile: false
  }

  componentDidMount() {
    authAxios
      .get(studentOrTeacher)
      .then(res => {
        this.setState({
          teacher: res.data.teacher,
          student: res.data.student,
          year_list: res.data.year_list
        })
        if(res.data.message === "Ya tienes un perfil"){
          this.setState({
            got_profile: true
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  isNullEmptyOrSpace = (string) => {
    return string === null || string === '' || string.trim().length === 0 || string === undefined
  }

  handleNameChange = (event,{value}) => {
    event.preventDefault()
    this.setState({
      name: value
    })
  }

  handleLastChange = (event,{value}) => {
    event.preventDefault()
    this.setState({
      lastname: value
    })
  }

  handleDNIChange = (event,{value}) => {
    event.preventDefault()
    this.setState({
      dni: value
    })
  }

  handleEntryChange = (event,{value}) => {
    event.preventDefault()
    this.setState({
      entry_year: value
    })
  }

  handleCurrentChange = (event,{value}) => {
    event.preventDefault()
    this.setState({
      current_year: value
    })
  }

  handleSubmit = () => {
    if(this.state.student) {
      if(this.isNullEmptyOrSpace(this.state.name) || 
        this.isNullEmptyOrSpace(this.state.lastname) || 
        this.isNullEmptyOrSpace(this.state.dni) || 
        this.isNullEmptyOrSpace(this.state.entry_year) || 
        this.isNullEmptyOrSpace(this.state.current_year.toString())){
          var messageError = document.getElementById("error-message")
          messageError.classList.remove("hideMessage")
          return
        }
      this.setState({
        creatingProfile: true
      })
      authAxios
        .post(createProfile,{
          name: this.state.name,
          last_name: this.state.lastname,
          dni: this.state.dni,
          entry_year: this.state.entry_year,
          current_year: this.state.current_year
        })
        .then(res => {
          console.log(res.data)
          var messageError = document.getElementById("error-message")
          messageError.classList.add("hideMessage")
          this.setState({
            creatingProfile: false,
            got_profile: true
          })
        })
        .catch(err => {
          console.log(err)
          this.setState({
            creatingProfile: false
          })
        })
    } else if (this.state.teacher) {
      if(this.isNullEmptyOrSpace(this.state.name) || 
        this.isNullEmptyOrSpace(this.state.lastname) || 
        this.isNullEmptyOrSpace(this.state.dni) || 
        this.isNullEmptyOrSpace(this.state.entry_year)){
          var messageError = document.getElementById("error-message")
          messageError.classList.remove("hideMessage")
          return
        }
      this.setState({
        creatingProfile: true
      })
      authAxios
        .post(createProfile,{
          name: this.state.name,
          last_name: this.state.lastname,
          dni: this.state.dni,
          entry_year: this.state.entry_year,
        })
        .then(res => {
          console.log(res.data)
          var messageError = document.getElementById("error-message")
          messageError.classList.add("hideMessage")
          this.setState({
            creatingProfile: false,
            got_profile: true
          })
        })
        .catch(err => {
          console.log(err)
          this.setState({
            creatingProfile: false
          })
        })
    }
  }

  render() {

    const { year_list, student, teacher ,got_profile, creatingProfile } = this.state

    if(got_profile){
      return <Redirect to="/" />
    }

    var options = []
    if(year_list !== null && year_list !== undefined){
      year_list.map((year,index) =>{
        options.push({
          key: {index},
          text: year.year + "° " + year.division_name,
          value: year.id
        })
      })
    }

    return (
      <div>
        <Message
          className="hideMessage"
          negative 
          id="error-message"
          style={{width:'75%',margin:'auto'}}
        >
          <Message.Header>
            Verifica que hayas completado todos los campos correctamente 
            </Message.Header>
        </Message>
        <h1 
          style={{
            margin:'auto',
            textAlign:'center',
            margin:'20px 0px 20px 0px'
          }}>
            Nuevo Perfil
        </h1>
        <Segment 
          inverted
          className="create-profile-form" 
          style={{
            margin:'auto',
            textAlign:'center',
            borderRadius:'20px',
            padding:'30px',
            marginBottom: '100px'
          }}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input
                value={this.state.name}
                onChange={this.handleNameChange}
                fluid
                placeholder='Nombre(s)'
              />
              <Form.Input
                value={this.state.lastname}
                onChange={this.handleLastChange}
                fluid
                placeholder='Apellido(s)'
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                value={this.state.dni}
                onChange={this.handleDNIChange}
                fluid
                placeholder='DNI'
              />
              <Form.Input
                value={this.state.entry_year}
                onChange={this.handleEntryChange}
                fluid
                placeholder='Año de ingreso'
              />
            </Form.Group>
            { student ? 
                <Form.Select
                    onChange={this.handleCurrentChange}
                    options={options}
                    control={Select}
                    fluid
                    placeholder='Año actual de curso'
                  /> : null
            }
            <Button
              loading={creatingProfile}
              disabled={creatingProfile}
              color='teal'
              type='submit'
              style={{width:'33%'}}>
                Crear Perfil
            </Button>
          </Form>
        </Segment>
      </div>
    )
  }
}
