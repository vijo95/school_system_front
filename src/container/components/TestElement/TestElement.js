import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './TestElement.css'

export default class TestElement extends Component {
  
  render() {

    const {
      date,
      subject_name,
      subject_year,
      subject_year_division,
      title,

      grade,
    } = this.props.test
    const test_id = this.props.test_id
    const teacher = this.props.teacher

    return (
      <>
        { 6 <= grade ?
            <div className="card test-element test-passed">
              <h3>{subject_name + " de " + subject_year + "° " + subject_year_division}</h3>
              <h4>{title}</h4>
              <h5>Fecha: {date}</h5>
              <h5 style={{color:'white'}}>Nota: {grade}</h5>
            </div> :
          grade < 6 && grade !== null ?
            <div className="card test-element test-failed">
              <h3>{subject_name + " de " + subject_year + "° " + subject_year_division}</h3>
              <h4>{title}</h4>
              <h5>Fecha: {date}</h5>
              <h5 style={{color:'white'}}>Nota: {grade}</h5>
            </div> :
          teacher ?
            <div className="card test-element">
              <Link to={`/student-tests/${test_id}`}>
                <h3>{subject_name + " de " + subject_year + "° " + subject_year_division}</h3>
                <h4>{title}</h4>
                <h5>Fecha: {date}</h5>
              </Link>
            </div> :
            <div className="card test-element">
              <h3>{subject_name + " de " + subject_year + "° " + subject_year_division}</h3>
              <h4>{title}</h4>
              <h5>Fecha: {date}</h5>
            </div>
        }
      </>
    )
  }
}
