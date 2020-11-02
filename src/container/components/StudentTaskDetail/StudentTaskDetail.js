import React, { Component } from 'react'
import { Form, Select } from 'semantic-ui-react'

import './StudentTaskDetail.css'

export default class StudentTaskDetail extends Component {
  
  state = {
    grade: null,
    student_task_id: null,
    delivered: null,
  }

  componentDidMount() {
    this.setState({
      grade: this.props.grade,
      student_task_id: this.props.student_task_id,
      delivered: this.props.delivered
    })
  }

  handleGradeChange = (event,{value}) => {
    event.preventDefault()
    this.setState({
      grade: value},
      this.props.changeGrade(this.state.student_task_id, value)
    )
  }

  handleDeliveredChange = (event,{value}) => {
    event.preventDefault()
    this.setState({
      delivered: value},
      this.props.changeDelivered(this.state.student_task_id, value)
    )
  }
  
  render() {
    
    const { lastname, name, grade } = this.props

    var options = [
      {key:2, text:'Nada', value:null},
      {key:1, text:'Si', value:true},
      {key:0, text:'No', value:false},
    ]

    return (
      <> 
        { 6 <= grade ?
            <tr style={{backgroundColor:'rgba(52, 186, 58, 0.7)'}}>
              <td>
                <i>{lastname}</i>
                </td>
              
              <td>{name}</td>
              
              <td style={{textAlign:'center'}}>
                <Form.Select
                  onChange={this.handleDeliveredChange}
                  value={this.state.delivered}
                  control={Select}
                  fluid
                  options={options}
                  placeholder='Entragado'
                />
              </td>
              
              <td style={{textAlign:'center'}}>
                <Form.Input 
                  onChange={this.handleGradeChange}
                  style={{width:'60px',padding:'0px'}}
                  value={this.state.grade}>
                </Form.Input>
              </td>
            </tr> :
          grade < 6 && grade !== null ?
            <tr style={{backgroundColor:'rgba(213, 0, 0, 0.7)'}}>
              <td>
                <i>{lastname}</i>
                </td>
              
              <td>{name}</td>
              
              <td style={{textAlign:'center'}}>
                <Form.Select
                  onChange={this.handleDeliveredChange}
                  value={this.state.delivered}
                  control={Select}
                  fluid
                  options={options}
                  placeholder='Entragado'
                />
              </td>
              
              <td style={{textAlign:'center'}}>
                <Form.Input
                  onChange={this.handleGradeChange}
                  style={{width:'60px',padding:'0px'}}
                  value={this.state.grade}>
                </Form.Input>
              </td>
            </tr> :
            <tr style={{backgroundColor:'white'}}>
              <td>
                <i>{lastname}</i>
                </td>
              
              <td>{name}</td>
              
              <td style={{textAlign:'center'}}>
                <Form.Select
                  onChange={this.handleDeliveredChange}
                  value={this.state.delivered}
                  control={Select}
                  fluid
                  options={options}
                  placeholder='Entragado'
                />
              </td>

              <td style={{textAlign:'center'}}>
                <Form.Input
                  onChange={this.handleGradeChange}
                  style={{width:'60px',padding:'0px'}}
                  value={this.state.grade}>
                </Form.Input>
              </td>
            </tr>
        }
      </>
    )
  }
}
