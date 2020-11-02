import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./store/actions/auth";
import BaseRouter from "./routes";
import Layout from './container/pages/Layout'

class App extends Component {
  
  componentDidMount() {
    this.props.onTryAutoLogIn();
  }

  render(){
    return (
      <Router>
        <Layout>
          <BaseRouter />
        </Layout>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogIn: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
