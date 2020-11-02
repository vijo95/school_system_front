import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { authAxios } from '../../../utils'
import { home } from '../../../constants'

import TestList from '../../components/TestList/TestList'
import TaskList from '../../components/TaskList/TaskList'
import './Home.css'

class Home extends Component {


  state = {
    loadingTaskTest: false,

    teacher: false,
    task_list_teacher: null,
    test_list_teacher: null,

    student: false,
    task_list_student: null,
    test_list_student: null,

    got_profile: true,
  }

  componentDidMount(){
    authAxios
      .get(home)
      .then(res => {
        this.setState({
          teacher: res.data.teacher,
          task_list_teacher: res.data.task_list_teacher,
          test_list_teacher: res.data.test_list_teacher,

          student: res.data.student,
          task_list_student: res.data.task_list_student,
          test_list_student: res.data.test_list_student,

          loadingTaskTest: false
        })
        if(res.data.message === "Debes crearte un perfil"){
          this.setState({
            got_profile: false
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  render() {
    const { authenticated } = this.props
    const { got_profile } = this.state

    if(got_profile === false){
      return <Redirect to="/create-profile/" />
    }

    return (
      <div className="task-test-list">
        { 
          authenticated ?
            <>
              { this.state.loadingTaskTest ? 
                <div className="loader"></div> :
                <>
                  {
                    this.state.teacher ?
                      <>
                        <TaskList 
                          teacher={this.state.teacher} 
                          task_list={this.state.task_list_teacher}
                        />
                        
                        <TestList 
                          teacher={this.state.teacher}
                          test_list={this.state.test_list_teacher}
                        />
                      </> : 
                    this.state.student ?
                      <>
                        <TaskList 
                          student={this.state.student} 
                          task_list={this.state.task_list_student}
                        />
                        <TestList
                          student={this.state.student} 
                          test_list={this.state.test_list_student}
                        />
                      </> : null
                  }
                </>
              }
            </> :
            null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
  };
};


export default withRouter(
  connect(
    mapStateToProps,
  )(Home)
)
