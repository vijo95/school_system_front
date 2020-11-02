import React, { Component } from 'react'
import { Form, Select } from 'semantic-ui-react'

import './StudentTestDetail.css'

export default class StudentTestDetail extends Component {

  state = {
    grade: null,
    student_test_id: null,
    delivered: null,
  }

  componentDidMount() {
    this.setState({
      grade: this.props.grade,
      student_test_id: this.props.student_test_id,
    })
  }

  handleGradeChange = (event,{value}) => {
    event.preventDefault()
    this.setState({
      grade: value},
      this.props.changeGrade(this.state.student_test_id, value)
    )
  }

  render() {

    const { lastname, name, grade } = this.props

    return (
      <> 
        { 6 <= grade ?
            <tr style={{backgroundColor:'rgba(52, 186, 58, 0.7)'}}>
              <td>
                <i>{lastname}</i>
                </td>
              
              <td>{name}</td>
              
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
