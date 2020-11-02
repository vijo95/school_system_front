import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authLogin } from "../../../store/actions/auth";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  render() {
    
    const { error, loading, token } = this.props;
    const { username, password } = this.state;

    if (token) {
      return window.location.href = "/"
    }
    
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            Inicio de Sesión
          </Header>
          {error && <p>{this.props.error.message}</p>}

          <React.Fragment>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  onChange={this.handleChange}
                  value={username}
                  name="username"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Usuario"
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={password}
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Contraseña"
                  type="password"
                />

                <Button
                  color="blue"
                  fluid
                  size="large"
                  loading={loading}
                  disabled={loading}
                >
                  Iniciar Sesión
                </Button>
              </Segment>
            </Form>
            <Message>
              ¿No tenés una cuenta? <br/>
              Podés usar cuenta de invitado <br/>
                <i style={{color:'#00B0FF'}}>
                  Profesor: usuario: 12136149 | contraseña: testing4321 <br/>
                  Alumno: usuario: 35417521 | contraseña: testing4321
                </i>
            </Message>
          </React.Fragment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(authLogin(username, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);